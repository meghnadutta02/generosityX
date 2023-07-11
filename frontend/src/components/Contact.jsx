import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import {toast} from "react-toastify"
function Contact() {
  const {
    register,
    trigger,
    formState: { errors },
    getValues,
    reset,
  } = useForm();
  const onSubmit = async (e) => {
    e.preventDefault();
    const isValid = await trigger();

    if (isValid) {
      const formData = getValues();
      console.log(formData)
      try {
        const promise = axios.post("/api/campaigns/contact", formData);
        toast.promise(promise, {
          pending: "Submitting message...",
          success: `We will get back to to you shortly`,
          error: "Error sending message",
        });
        const response = await promise;
        if (response.status===200) reset();
      } catch (error) {
        toast.error("An error occurred while submitting the form:", error);
      }
    }
  };

  return (
    <div name="contact" className="py-8">
      <h2 className="text-4xl font-bold  inline border-b-4 border-blue-600 tracking-tight text-gray-900">
        Contact Us
      </h2>

      <div className="w-full  pt-8 flex justify-center items-center">
        <form
          action=""
          className="flex flex-col max-w-[600px] w-full"
          onSubmit={onSubmit}
        >
          <div className="pb-6">
            <p className="text-gray-600 py-4">
              {" "}
              Write to us your queries, feedbacks or any other matters.{" "}
            </p>
          </div>
          <input
            className="bg-[#ccd6f6] p-2"
            type="text"
            placeholder="NAME"
            {...register("name", {
              required: true,
              maxLength: 100,
            })}
          />
          {errors.name && (
            <p className="mt-1 text-primary-500">
              {errors.name.type === "required" && "This field is required"}
              {errors.name.type === "maxLength" && "Maximum characters is 100"}
            </p>
          )}
          <input
            className="my-4 p-2 bg-[#ccd6f6]"
            type="email"
            placeholder="EMAIL"
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}$/i,
            })}
          />
          {errors.email && (
            <p className="mt-1 text-primary-500">
              {errors.email.type === "required" && "This field is required"}
              {errors.email.type === "pattern" && "Not a valid email"}
            </p>
          )}
          <textarea
            className="bg-[#ccd6f6] p-2"
            rows={4}
            cols={50}
            placeholder="MESSAGE"
            {...register("message", {
              required: true,
              maxLength: 2000,
            })}
          />
          {errors.message && (
            <p className="mt-1 text-primary-500">
              {errors.message.type === "required" && "This field is required"}
              {errors.message.type === "maxLength" &&
                "Maximum characters is 2000"}
            </p>
          )}
          <button
            className="text-gray-500 border-2 border-gray-600 hover:bg-pink-600 hover:border-pink-600 px-4 py-3 my-8 mx-auto flex items-center"
            type="submit"
          >
            Let's Connect
          </button>
        </form>
      </div>
      {/* </div> */}
    </div>
  );
}

export default Contact;
