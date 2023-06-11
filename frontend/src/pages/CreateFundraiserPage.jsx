import { useState } from "react";
import { TiImage, TiTimes } from "react-icons/ti";
import { Alert } from "@mui/material";
export default function CreateFundraiserPage() {
  const [proofImages, setProofImages] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [uploadImages,setUploadImages]=useState(false);
  const [formData,setFormData]=useState({
    title:"",
    description:"",
    target:"",
    creator:
    {
      name:"",
      email:"",
      phoneNumber:""
    },
    deadline:"",
    image:[]
  })
  const handleCoverImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCoverImage(file);
    }
  };
  const handleChange=(event)=>
  {
    const {name,value}=event.target;
    setFormData((prevData)=>({...prevData,[name]:value}))
  }
  const handleCreatorChange=(event)=>
  {
    const {name,value}=event.target;
    setFormData((prevData)=>({...prevData,creator:{[name]:value}}))
  }
  const handleSubmit=async(event)=>{
    event.preventDefault();
    image=[...coverImage,proofImages];
    
  }
  const handleProofImageUpload = (event) => {
    const files = event.target.files;
    const updatedProofImages = Array.from(files).slice(0, 3); // Limiting to 3 images
    setProofImages(updatedProofImages);
  };
  const handleDeleteProofImage = (index) => {
    const updatedImages = [...proofImages];
    updatedImages.splice(index, 1);
    setProofImages(updatedImages);
  };
  const handleDeleteCoverImage = () => {
    setCoverImage(null);
  };
  return (
    <div className="container px-8 py-24 md:py-28 md:px-16 lg:px-36 relative bg-[url(https://img.freepik.com/free-vector/colorful-hands-background_23-2147508530.jpg?w=740&t=st=1680548379~exp=1680548979~hmac=b9f502e093a6b7ba1a136f82d2d0aeb5622a5454e93e61356109c1a32155ecc1)] bg-cover bg-center bg-no-repeat">
      <form>
        <div className="space-y-12 lg:px-28 lg:py-10 bg-teal-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-80 border-2 border-gray-800 shadow-xl shadow-black">
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
                    <p className="text-xs leading-5 text-black">
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
                              onClick={() => handleDeleteProofImage(index)}
                            >
                              <TiTimes className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-4 flex text-xl leading-6 text-black">
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
                    <p className="text-xs leading-5 text-black">
                      PNG, JPG, JPEG up to 4MB
                    </p>
                  </div>
                </div>
                <Alert
                  severity="info"
                  sx={{ backgroundColor: "transparent", padding: "0" }}
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
                    onChange={handleCreatorChange}
                    value={formData.creator.name}
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
                    onChange={handleCreatorChange}
                    value={formData.creator.email}
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
                    onChange={handleCreatorChange}
                    value={formData.creator.phoneNumber}
                    id="postal-code"
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:text-xl sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-xl font-semibold leading-6">
              Cancel
            </button>
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
    </div>
  );
}
