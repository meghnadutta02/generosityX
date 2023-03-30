import React from "react";

const About = () => {
  return (
    <div
      name="about"
      className="w-full h-screen  text-cyan-700 sm:p-10 md:p-24"
    >
      <div className="flex flex-col justify-center items-center w-full h-full border-gray-900 border-4 rounded-3xl">
        <div className="max-w-[1000px] w-full grid grid-cols-2 gap-8">
          <div className="sm:text-right pb-16 pl-4">
            <p className="text-4xl text-black font-bold inline border-b-4 border-blue-600">
              About Us
            </p>
          </div>
        </div>
        <div className="max-w-[1000px] w-full grid sm:grid-cols-2 gap-8 px-4">
          <div className="sm:text-right text-4xl font-bold">
            <p>Good deeds to help those who need</p>
          </div>
          <div>
            <p className="text-xl mb-4">
              Our mission is to provide essential services and support to those
              in need, while also fostering a sense of community and connection
              among all members of our society. We believe that by working
              together, we can make a difference and create a brighter future
              for all.
            </p>
            <p className="text-xl">
              We are passionate about making a difference, and we welcome anyone
              who shares our vision to join us. Whether you're a volunteer,
              donor, or simply someone who cares about the well-being of others,
              we invite you to be a part of our community service company and
              help us make a positive impact in the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
