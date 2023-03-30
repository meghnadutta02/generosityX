import React from "react";

function Contact() {
  return (
    <div name="contact" className="py-8">
      <h2 className="text-4xl font-bold  inline border-b-4 border-blue-600 tracking-tight text-gray-900">
        Contact Us
      </h2>

      <div className="w-full  pt-8 flex justify-center items-center">
        <form action="" className="flex flex-col max-w-[600px] w-full">
          <div className="pb-6">
            <p className="text-gray-600 py-4">
              {" "}
              Write to us your queries, feedbacks or any other matters.{" "}
            </p>
          </div>
          <input
            className="bg-[#ccd6f6] p-2"
            type="text"
            placeholder="Name"
            name="name"
          />
          <input
            className="my-4 p-2 bg-[#ccd6f6]"
            type="email"
            placeholder="Email"
            name="email"
          />
          <textarea
            className="bg-[#ccd6f6] p-2"
            name="message"
            rows="6"
            placeholder="Message"
          ></textarea>
          <button className="text-gray-500 border-2 border-gray-600 hover:bg-pink-600 hover:border-pink-600 px-4 py-3 my-8 mx-auto flex items-center">
            Let's Connect
          </button>
        </form>
      </div>
      {/* </div> */}
    </div>
  );
}

export default Contact;
