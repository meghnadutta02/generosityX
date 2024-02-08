import React, { useState, useEffect } from "react";
import axios from "axios";
import { TiImage, TiTimes } from "react-icons/ti";
import { FaSpinner } from "react-icons/fa";
import { Alert, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import FoodPageComponent from "./FoodPageComponent";
import DeletionPage from "./DeletionPage";
import "../App.css";
export default function FoodDonationPage() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [food, setFood] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    quantity: "",
    description: "",
    city: "",
    country: "",
    postal: "",
    state: "",
    street: "",
  });
  const [deleted, setDeleted] = useState(false);
  const handleDelete = () => {
    setDeleted(true);
  };
  const [id, setId] = useState("");
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
  const handleImageUpload = (event) => {
    const files = event.target.files;
    const updatedImages = Array.from(files);
    const validateResult = imageValidate(updatedImages);
    if (validateResult !== null) {
      validateResult.errors.forEach((error) => {
        toast.error(error);
      });
      return;
    }

    const images1 = [...images, ...updatedImages];
    setImages(images1);
  };
  const handleDeleteImage = (event, index) => {
    event.preventDefault();
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requiredFields = [
      "quantity",
      "description",
      "state",
      "country",
      "city",
      "postal",
      "street",
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

    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setSubmit(true);
  };

  useEffect(() => {
    const createFood = async () => {
      if (submit) {
        setIsLoading1(true);
        try {
          const { data } = await axios.post(
            "/api/donations/donate?type=food",
            formData
          );
          setId(data.id);
          if (data && data.id) {
            cloudinaryApiRequest(data.id, images);
          }
        } catch (err) {
          console.log("inside useffect" + err.message);
          alert("Something went wrong!");
        }
      }
    };

    createFood();
  }, [submit]);
  const cloudinaryApiRequest = (productId, images) => {
    const url = "https://api.cloudinary.com/v1_1/dsjmm6114/image/upload";

    images.forEach((image) => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "chz1skwr");

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          return response.json();
        })
        .then(async (data) => {
          try {
            const response = await axios.post(
              `/api/donations/image/${productId}?type=food`,
              data
            );
            if (response.status === 201) {
              setIsLoading1(false);
              setSubmit(false);
              setFood(true);
            } else {
              console.log("Upload failed:", response);
            }
          } catch (err) {
            console.log(err.message);
          }
        })
        .catch((err) => {
          console.log("inside cloudinary" + err.message);
        });
    });
  };
  const fetchLocationDetails = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setError(null);

          axios
            .get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiYW5rdXNocm95MDgiLCJhIjoiY2xmeHlydmV5MDV6cDNvbXNqYmM3ejR5bCJ9.Y-mQFNAzEIiDg37errtwOg`
            )
            .then((response) => {
              const { features } = response.data;
              const address = features[0].text + features[2].text;
              const pincode = features[1].text;
              const city = features[3].text;
              const state = features[4].text;
              const country = features[5].text;
              formData.street = address;
              formData.postal = pincode;
              formData.city = city;
              formData.state = state;
              formData.country = country;
              setIsLoading(false);
            })
            .catch((error) => {
              setIsLoading(false);
              setAddress("");
              setError("Failed to fetch location details");
            });
        },
        (error) => {
          setIsLoading(false);
          setError(error.message);
        }
      );
    } else {
      setIsLoading(false);
      setError("Geolocation is not supported by this browser");
    }
  };

  return (
    <div className="container p-28 lg:px-60">
      {isLoading1 ? (
        <div
          style={{ minHeight: "40vh", paddingTop: "100px" }}
          className="container p-16 py-10 lg:px-50 flex justify-center"
        >
          <CircularProgress />
        </div>
      ) : food ? (
        <div
          style={{ minHeight: "40vh" }}
          className="container p-16 py-10 lg:px-50"
        >
          {!deleted ? (
            <>
              <Alert severity="info" sx={{ fontSize: "larger" }}>
                <strong>Food donation successful!</strong>
                <br />
              </Alert>
              <FoodPageComponent id={id} delete={handleDelete} />
            </>
          ) : (
            <DeletionPage />
          )}
        </div>
      ) : (
        <form className="relative " style={{ minHeight: "70vh" }}>
          <div className="space-y-12 p-12 bg-teal-100 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border-2 border-gray-800 shadow-xl shadow-black">
            <div className="border-b border-black/10 pb-12">
              <h1 className="text-center font-bold text-4xl">
                Contribute Food
              </h1>
              <p className="mt-1 text-lg text-center text-black">
                Your kindness will have a lasting impact!
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="quantity"
                    className="block text-md font-medium leading-6 text-black"
                  >
                    Quantity
                  </label>
                  <div className="mt-2">
                    <p className="text-sm mb-1 text-gray-500">
                      Approximate number of people the food can feed:
                    </p>
                    <div
                      className="flex rounded-md shadow-sm ring-1 ring-inset ring-black focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                      style={{ background: "white" }}
                    >
                      <select
                        required
                        name="quantity"
                        id="quantity"
                        autoComplete="quantity"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-black placeholder:text-black focus:ring-0 sm:text-md sm:leading-6"
                        value={formData.quantity}
                        onChange={handleChange}
                      >
                        <option value="">Select quantity</option>
                        <option value="10+">10+</option>
                        <option value="25+">25+</option>
                        <option value="50+">50+</option>
                        <option value="100+">100+</option>
                        <option value="300+">300+</option>
                        <option value="500+">500+</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-md font-medium leading-6 text-black"
                  >
                    Food description
                  </label>
                  <p className="mt-3 text-md leading-6 text-black">
                    {" "}
                    What are you donating? How does it help the community?
                  </p>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="description"
                      rows={3}
                      onChange={handleChange}
                      value={formData.description}
                      className="block w-full rounded-md border-0 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-md sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="images"
                    className="block text-2xl font-medium leading-6 text-black"
                  >
                    Upload images of the food items
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-black px-6 py-10">
                    <div className="text-center">
                      {images.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {images.map((image, index) => (
                            <div key={index} className="relative w-20 h-20">
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`food image ${index + 1}`}
                                className="object-cover w-full h-full rounded-md"
                              />
                              <button
                                className="absolute top-0 right-0 -mt-3 -mr-3 p-1 text-black hover:text-red-500 focus:outline-none"
                                onClick={() => handleDeleteImage(event, index)}
                              >
                                <TiTimes className="w-5 h-5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <div
                        className="mt-4 flex text-xl leading-6 text-black"
                        style={{
                          display: images.length === 3 ? "none" : "block",
                        }}
                      >
                        <label
                          htmlFor="image-upload"
                          className="relative cursor-pointer rounded-md bg-white px-3 font-semibold focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-800 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file </span>
                          <TiImage className="inline-block w-5 h-5" />
                          <input
                            id="image-upload"
                            name="image-upload"
                            type="file"
                            className="sr-only"
                            multiple
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                      <p
                        style={{
                          display: images.length == 3 ? "none" : "block",
                        }}
                        className="text-xs leading-5 text-black my-1"
                      >
                        PNG, JPG, JPEG up to 2MB
                      </p>
                    </div>
                  </div>
                  {images.length > 3 && (
                    <Alert
                      severity="info"
                      sx={{
                        backgroundColor: "transparent",
                        padding: "0",
                        display: images.length > 3 ? "none" : "default",
                      }}
                    >
                      Please upload a maximum of four images.
                    </Alert>
                  )}
                </div>
              </div>
            </div>

            <div className="border-b border-black/10 pb-12">
              <h2 className="text-3xl font-semibold leading-7 text-black">
                Pickup Address
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-md font-medium leading-6 text-black"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 p-1.5 text-black shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-md sm:leading-6"
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex mt-6">
                  {error && <div>{error}</div>}
                  <button
                    className="flex-shrink-0 px-2 bg-blue-600 rounded-xl hover:bg-blue-500 text-white"
                    onClick={fetchLocationDetails}
                  >
                    Use current location
                  </button>
                  {isLoading && (
                    <span className="text-center ml-4">
                      <FaSpinner className="animate-spin text-blue-400 inline-block mx-auto" />{" "}
                      Locating...
                    </span>
                  )}
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="street-address"
                    className="block text-md font-medium leading-6 text-black"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      type="text"
                      name="street"
                      id="street-address"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                      value={formData.street}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-md font-medium leading-6 text-black"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-md font-medium leading-6 text-black"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      type="text"
                      name="state"
                      id="region"
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-md font-medium leading-6 text-black"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      type="text"
                      name="postal"
                      id="postal-code"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                      value={formData.postal}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex foods-center justify-end gap-x-6">
            <button
              type="submit"
              onClick={handleSubmit}
              className="rounded-md bg-indigo-600 py-2 px-3 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
