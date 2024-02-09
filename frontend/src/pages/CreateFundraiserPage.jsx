import { useEffect, useState } from "react";
import { TiImage, TiTimes } from "react-icons/ti";
import { Alert, CircularProgress, AlertTitle } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import "../App.css";

export default function CreateFundraiserPage() {
  const [proofImages, setProofImages] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [fundraiser, setFundraiser] = useState(false);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    target: "",
    name: "",
    email: "",
    phoneNumber: "",
    deadline: "",
  });
  const [isLoading, setIsLoading] = useState(false);
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
      setCoverImage(file);
    }
  };

  const handleProofImageUpload = (event) => {
    const files = event.target.files;
    const updatedImages = Array.from(files);
    const validateResult = imageValidate(updatedImages);
    if (validateResult !== null) {
      validateResult.errors.forEach((error) => {
        toast.error(error);
      });
      return;
    }

    const proofImages1 = [...proofImages, ...updatedImages];
    setProofImages(proofImages1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requiredFields = [
      "title",
      "description",
      "target",
      "deadline",
      "name",
      "email",
      "phoneNumber",
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

    if (!coverImage) {
      toast.error("Please upload a cover image");
      return;
    }

    if (proofImages.length === 0) {
      toast.error("Please upload at least one proof image");
      return;
    }

    setImages([coverImage, ...proofImages]);
    setSubmit(true);
  };

  useEffect(() => {
    const createFundraiser = async () => {
      if (submit) {
        setIsLoading(true);

        try {
          const { data } = await axios.post("/api/fundraisers", formData);
          if (data && data.id) {
            cloudinaryApiRequest(data.id, images);
          }
        } catch (err) {
          console.log("inside useffect" + err.message);
          alert("Something went wrong!");
        }
      }
    };

    createFundraiser();
  }, [submit]);

  const handleDeleteProofImage = (event, index) => {
    event.preventDefault();
    const updatedImages = proofImages.filter((_, i) => i !== index);
    setProofImages(updatedImages);
  };

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
              "/api/fundraisers/upload?id=" + productId,
              data
            );
            if (response.status === 201) {
              setIsLoading(false);
              setSubmit(false);
              setFundraiser(true);
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

  const handleDeleteCoverImage = () => {
    setCoverImage(null);
  };
  return (
    <div className="px-8 py-24 md:py-28 md:px-16 lg:px-40 relative">
      {isLoading ? (
        <div
          style={{ minHeight: "40vh", paddingTop: "100px" }}
          className="container p-16 py-10 lg:px-50 flex justify-center"
        >
          <CircularProgress />
        </div>
      ) : fundraiser ? (
        <div
          style={{ minHeight: "40vh" }}
          className="container p-16 py-10 lg:px-50"
        >
          <Alert severity="info" sx={{ fontSize: "larger" }}>
            <strong>Fundraiser submitted!</strong>
            <br />
            Your fundraiser has been created. Please wait for verification by
            admin.
          </Alert>
        </div>
      ) : (
        <form>
          <div className="space-y-12 lg:px-24 lg:py-10 bg-teal-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border-2 border-gray-800 shadow-xl shadow-black">
            <div className="p-8 ">
              <h1 className="text-center font-bold text-4xl pt-8">
                Create a Fundraiser
              </h1>
              <p className="mt-1 text-xl text-center">
                Start a new initiative to help a cause
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-2xl font-medium leading-6 text-black"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-black focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-800 sm:max-w-md">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        onChange={handleChange}
                        value={formData.title}
                        autoComplete="title"
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
                  <p className="mt-3 text-xl leading-6 text-black">
                    {" "}
                    Why are you starting the fundraiser ?
                  </p>
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
                  <label
                    htmlFor="username"
                    className="block text-2xl font-medium leading-6 text-black"
                  >
                    Target amount (in $)
                  </label>
                  <div className="my-2 pb-8">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-black focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-800 sm:max-w-md">
                      <input
                        type="number"
                        name="target"
                        id="amount"
                        onChange={handleChange}
                        value={formData.target}
                        autoComplete="amount"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-black placeholder:text-gray-500 focus:ring-0 sm:text-xl sm:leading-6"
                        placeholder="60,000"
                      />
                    </div>
                  </div>
                  <label
                    htmlFor="username"
                    className="block text-2xl font-medium leading-6 text-black"
                  >
                    Deadline
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-black focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-800 sm:max-w-md">
                      <input
                        type="date"
                        name="deadline"
                        id="date"
                        onChange={handleChange}
                        value={formData.deadline}
                        autoComplete="amount"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-black placeholder:text-gray-500 focus:ring-0 sm:text-xl sm:leading-6"
                        placeholder="60,000"
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
                      {coverImage && (
                        <div className="mt-4 relative">
                          <img
                            src={URL.createObjectURL(coverImage)}
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

                <div className="col-span-full">
                  <label
                    htmlFor="proof-images"
                    className="block text-2xl font-medium leading-6 text-black"
                  >
                    Proof of Certification/Documents Upload
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-black px-6 py-10">
                    <div className="text-center">
                      {proofImages.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {proofImages.map((image, index) => (
                            <div key={index} className="relative w-20 h-20">
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Proof ${index + 1}`}
                                className="object-cover w-full h-full rounded-md"
                              />
                              <button
                                className="absolute top-0 right-0 -mt-3 -mr-3 p-1 text-black hover:text-red-500 focus:outline-none"
                                onClick={() =>
                                  handleDeleteProofImage(event, index)
                                }
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
                          display: proofImages.length === 3 ? "none" : "block",
                        }}
                      >
                        <label
                          htmlFor="proof-image-upload"
                          className="relative cursor-pointer rounded-md bg-white px-3 font-semibold focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-800 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file </span>
                          <TiImage className="inline-block w-5 h-5" />
                          <input
                            id="proof-image-upload"
                            name="proof-image-upload"
                            type="file"
                            className="sr-only"
                            multiple
                            onChange={handleProofImageUpload}
                          />
                        </label>
                      </div>
                      <p
                        style={{
                          display: proofImages.length == 3 ? "none" : "block",
                        }}
                        className="text-xs leading-5 text-black my-1"
                      >
                        PNG, JPG, JPEG up to 1MB
                      </p>
                    </div>
                  </div>
                  <Alert
                    severity="info"
                    sx={{
                      backgroundColor: "transparent",
                      padding: "0",
                      display: proofImages.length == 3 ? "none" : "default",
                    }}
                  >
                    Upto 3 images
                  </Alert>
                </div>
              </div>
            </div>

            <div className="p-8">
              <h2 className="text-2xl font-semibold leading-7 text-black">
                Personal Information
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-xl font-medium leading-6 text-black"
                  >
                    Full name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      value={formData.name}
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:text-xl sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-xl font-medium leading-6 text-black"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={handleChange}
                      value={formData.email}
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
                      name="phoneNumber"
                      onChange={handleChange}
                      value={formData.phoneNumber}
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
    </div>
  );
}
