import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Grid,
  Alert,
  Button,
  Box,
  Typography,
  Card,
  CardHeader,
} from "@mui/material";
import AdminNavbar from "./AdminNavbar";
import { TiImage, TiTimes } from "react-icons/ti";
import axios from "axios";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-responsive-carousel/lib/styles/carousel.min.css";
function CreateCampaign() {
  const [submit, setSubmit] = useState(false);
  const [campaign, setCampaign] = useState("");
  const [images, setImages] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    goal: "",
    city: "",
    address: "",
    endDate: "",
    startDate: "",
    organizer: "",
    contactEmail: "",
    contactPhone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [deletionSuccess, setDeletionSuccess] = useState(false);
  const imageValidate = (images) => {
    let imagesTable = [];
    if (Array.isArray(images)) {
      imagesTable = images;
    } else {
      imagesTable.push(images);
    }

    const validationErrors = [];

    imagesTable.forEach((image) => {
      if (image.size > 2097152) {
        validationErrors.push("Size too large (above 2 MB)");
      }
      const filetypes = /jpg|jpeg|png/;
      const mimetype = filetypes.test(image.type);
      if (!mimetype) {
        validationErrors.push(
          "Incorrect file type (should be jpg, jpeg, or png)"
        );
      }
    });

    return validationErrors.length > 0 ? { errors: validationErrors } : null;
  };
  const [id, setId] = useState("");
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/campaigns/delete/${id}`);
      if (data.successful) {
        setDeletionSuccess(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleCoverImageUpload = (event) => {
    const file = event.target.files[0];
    const validateResult = imageValidate(file);
    if (validateResult !== null) {
      validateResult.errors.forEach((error) => {
        toast.error(error);
      });
      return;
    }
    if (file) {
      setImages(file);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requiredFields = [
      "name",
      "description",
      "goal",
      "startDate",
      "endDate",
      "organizer",
      "city",
      "address",
      "contactEmail",
      "contactPhone",
    ];
    const invalidFields = requiredFields.filter(
      (field) => formData[field] === ""
    );

    if (invalidFields.length > 1) {
      toast.error(
        `Please fill in the following fields: ${invalidFields.join(", ")}`
      );
      return;
    } else if (invalidFields.length === 1) {
      toast.error(`Please fill in the field: ${invalidFields[0]}`);
      return;
    }

    if (!images) {
      toast.error("Please upload a cover image");
      return;
    }
    setSubmit(true);
  };

  useEffect(() => {
    const createCampaign = async () => {
      if (submit) {
        setIsLoading(true);

        try {
          const { data } = await axios.post("/api/campaigns/create", formData);
          if (data && data.id) {
            cloudinaryApiRequest(data.id, images);
            setId(data.id);
          }
        } catch (err) {
          console.log("inside useEffect" + err.message);
          alert("Something went wrong!");
        }
      }
    };

    createCampaign();
  }, [submit]);

  const cloudinaryApiRequest = (productId, image) => {
    const url = "https://api.cloudinary.com/v1_1/dsjmm6114/image/upload";
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "chz1skwr");

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then(async (data) => {
        try {
          const response = await axios.post(
            "/api/campaigns/upload?id=" + productId,
            data
          );
          if (response.status === 201) {
            setIsLoading(false);
            setSubmit(false);
            setCampaign(response.data.campaign);
          } else {
            console.log("Upload failed:", response);
          }
        } catch (err) {
          console.log(err.message);
        }
      })
      .catch((err) => {
        console.log("Inside Cloudinary:", err.message);
      });
  };

  const handleDeleteCoverImage = () => {
    setImages(null);
  };

  return (
    <div style={{ minHeight: "80vh" ,paddingTop: "100px" }}>
      <Grid
        container
        sx={{
          "& > .MuiGrid-item": {
            marginBottom: "8%",
          },
        }}
      >
        {/* <Grid item xs={12}>
          <AdminNavbar />
        </Grid> */}
        <Grid item xs={12} md={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={9} style={{ marginLeft: "3%" }}>
          {isLoading ? (
            <div
              style={{ minHeight: "40vh", paddingTop: "100px" }}
              className="container p-16 py-10 lg:px-50 flex justify-center"
            >
              <CircularProgress />
            </div>
          ) : campaign ? (
            <div
              style={{ minHeight: "40vh" }}
              className="container px-8 lg:px-50"
            >
              {deletionSuccess ? (
                <Alert severity="info" sx={{ fontSize: "larger" }}>
                  <strong>
                    Campaign deleted!{" "}
                    <a href="#" style={{textDecoration:"underline"}} onClick={() => window.location.reload()}>
                      Create
                    </a>{" "}
                    another
                  </strong>
                </Alert>
              ) : (
                <>
                  <Alert severity="info" sx={{ fontSize: "larger" }}>
                    <strong>Campaign created!</strong>
                  </Alert>
                  <Box
                    sx={{
                      marginTop: "1.18%",
                      backgroundColor: "#c0efeb",
                      padding: "2%",
                      borderRadius: "7px",
                    }}
                  >
                    <Grid container>
                      <Grid item xs={12} md={6}>
                        
                          <div className="carousel-cover-image">
                            <img
                              src={campaign.image.path}
                              alt="Campaign Cover"
                              style={{
                                maxHeight: "300px",
                                objectFit: "contain",
                                width: "100%",
                              marginBottom:"4%"
                              }}
                            />
                          </div>
                      
                        
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Card>
                          <CardHeader
                            title={campaign.name}
                            style={{
                              backgroundColor: "#20b2aa",
                              color: "#fff",
                            }}
                          />
                          <div
                            style={{ textAlign: "left", padding: "2.3% 2%" }}
                          >
                            <Typography
                              variant="body1"
                              gutterBottom
                              style={{ padding: "4px" }}
                            >
                              {campaign.description}
                            </Typography>
                            <Typography
                              variant="body2"
                              gutterBottom
                              style={{ padding: "4px" }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <span>
                                  Goal: $
                                  {Number(campaign.goal).toLocaleString(
                                    "en-US"
                                  )}
                                </span>
                                <span>
                                  From:{" "}
                                  {campaign.startDate
                                    .replaceAll("-", "/")
                                    .substring(5, 10)}
                                  <span className="ml-3">
                                    To:{" "}
                                    {campaign.endDate
                                      .replaceAll("-", "/")
                                      .substring(5, 10)}
                                  </span>
                                </span>
                              </div>
                            </Typography>

                            <strong style={{ paddingLeft: "4px" }}>
                              {" "}
                              Organizer details:
                            </strong>

                            <Typography
                              variant="body2"
                              gutterBottom
                              style={{ padding: "4px" }}
                            >
                              Name: {campaign.organizer}
                            </Typography>
                            <Typography
                              variant="body2"
                              gutterBottom
                              style={{ padding: "4px" }}
                            >
                              Email: {campaign.contactEmail}
                            </Typography>
                            <Typography
                              variant="body2"
                              gutterBottom
                              style={{ padding: "4px" }}
                            >
                              Phone number: {campaign.contactPhone}
                            </Typography>

                            <strong style={{ paddingLeft: "4px" }}>
                              {" "}
                              Address:
                            </strong>

                            <Typography
                              variant="body2"
                              gutterBottom
                              style={{ padding: "4px" }}
                            >
                              Address: {campaign.address}
                            </Typography>
                            <Typography
                              variant="body2"
                              gutterBottom
                              style={{ padding: "4px" }}
                            >
                              City: {campaign.city}
                            </Typography>
                          </div>
                        </Card>
                      </Grid>
                    </Grid>
                  </Box>
                  <div className="mt-3" style={{display:"flex",justifyContent:"flex-end"}}><Button
                            variant="contained"
                            color="error"
                            onClick={handleDelete}
                          >
                            Delete
                          </Button></div>
                  
                </>
              )}
            </div>
          ) : (
            <form>
              <div className="space-y-12 lg:px-24 lg:py-10 bg-teal-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 shadow-xl shadow-black">
                <div className="p-3">
                  <h1 className="text-center font-bold text-4xl">
                    Create a campaign
                  </h1>
                  <p className="mt-1 text-xl text-center">
                    Start a new initiative to help a cause
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="username"
                        className="block text-2xl font-medium leading-6 text-black"
                      >
                        Name of the event
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-black focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-800 sm:max-w-md">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleChange}
                            value={formData.name}
                            autoComplete="name"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-black placeholder:text-gray-500 focus:ring-0 sm:text-xl sm:leading-6"
                            placeholder="Save Ukraine !"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label
                        htmlFor="about"
                        className="block text-2xl font-medium leading-6 text-black"
                      >
                        State the cause
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="about"
                          name="description"
                          onChange={handleChange}
                          value={formData.description}
                          rows={3}
                          className="block w-full rounded-md border-0 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:py-1.5 sm:text-xl sm:leading-6"
                          defaultValue={""}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <h2 className="text-2xl font-semibold leading-7 text-black mb-4 mt-6">
                        Event details:
                      </h2>
                      <label
                        htmlFor="username"
                        className="block text-2xl font-medium leading-6 text-black"
                      >
                        Goal amount (in $)
                      </label>
                      <div className="my-2 pb-4">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-black focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-800 sm:max-w-md">
                          <input
                            type="number"
                            name="goal"
                            id="amount"
                            min={10000}
                            max={10000000}
                            onChange={handleChange}
                            value={formData.goal}
                            autoComplete="amount"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-black placeholder:text-gray-500 focus:ring-0 sm:text-xl sm:leading-6"
                            placeholder="30,000"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-4 flex gap-6">
                        <div>
                          <label
                            htmlFor="username"
                            className="block text-2xl font-medium leading-6 text-black"
                          >
                            From:
                          </label>
                          <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-black focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-800 sm:max-w-md">
                              <input
                                type="date"
                                name="startDate"
                                id="date"
                                onChange={handleChange}
                                value={formData.startDate}
                                autoComplete="amount"
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-black placeholder:text-gray-500 focus:ring-0 sm:text-xl sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="username"
                            className="block text-2xl font-medium leading-6 text-black"
                          >
                            To:
                          </label>
                          <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-black focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-800 sm:max-w-md">
                              <input
                                type="date"
                                name="endDate"
                                id="date"
                                onChange={handleChange}
                                value={formData.endDate}
                                autoComplete="amount"
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-black placeholder:text-gray-500 focus:ring-0 sm:text-xl sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="sm:col-span-2 mt-4">
                        <label
                          htmlFor="postal-code"
                          className="block text-xl font-medium leading-6 text-black"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="city"
                            onChange={handleChange}
                            value={formData.city}
                            id="postal-code"
                            autoComplete="postal-code"
                            className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:text-xl sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="col-span-full mt-4">
                        <label
                          htmlFor="about"
                          className="block text-2xl font-medium leading-6 text-black"
                        >
                          Venue
                        </label>

                        <div className="mt-2">
                          <textarea
                            id="about"
                            name="address"
                            onChange={handleChange}
                            value={formData.address}
                            rows={2}
                            className="block w-full rounded-md border-0 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:py-1.5 sm:text-xl sm:leading-6"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label
                        htmlFor="cover-photo"
                        className="block text-2xl font-medium leading-6 text-black"
                      >
                        Upload a cover image
                      </label>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-black px-6 py-10">
                        <div className="text-center">
                          {images && (
                            <div className="mt-4 relative">
                              <img
                                src={URL.createObjectURL(images)}
                                alt="Cover Image Preview"
                                className="object-cover w-40 h-40 rounded-md"
                              />
                              <button
                                className="absolute top-0 right-0 -mt-3 -mr-3 p-1 text-black hover:text-red-500 focus:outline-none"
                                onClick={() => handleDeleteCoverImage()}
                              >
                                <TiTimes className="w-8 h-8" />
                              </button>
                            </div>
                          )}
                          <div className="mt-4 flex text-xl leading-6 text-black">
                            <label
                              htmlFor="cover-image-upload"
                              className="relative cursor-pointer rounded-md bg-white px-3 font-semibold focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-800 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a file </span>
                              <TiImage className="inline-block w-5 h-5" />
                              <input
                                id="cover-image-upload"
                                name="cover-image-upload"
                                type="file"
                                className="sr-only"
                                onChange={handleCoverImageUpload}
                              />
                            </label>
                          </div>
                          <p className="text-xs leading-5 text-black my-1">
                            PNG, JPG, JPEG up to 1MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-1">
                  <h2 className="text-2xl font-semibold leading-7 text-black">
                    Organizer details:
                  </h2>
                  <div className="mt-8 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-xl font-medium leading-6 text-black"
                      >
                        Name of individual/company
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="organizer"
                          onChange={handleChange}
                          value={formData.organizer}
                          id="first-name"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:text-xl sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="contactEmail"
                        className="block text-xl font-medium leading-6 text-black"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="contactEmail"
                          name="contactEmail"
                          type="email"
                          onChange={handleChange}
                          value={formData.contactEmail}
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:text-xl sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-xl font-medium leading-6 text-black"
                      >
                        Phone number
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="contactPhone"
                          onChange={handleChange}
                          value={formData.contactPhone}
                          id="postal-code"
                          autoComplete="postal-code"
                          className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:text-xl sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="rounded-md bg-indigo-800 py-2 px-3 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateCampaign;
