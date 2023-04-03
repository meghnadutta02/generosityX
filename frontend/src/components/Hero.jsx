import React from "react";
import { Link } from "react-router-dom";
import { Link as ScrolLink } from "react-scroll";
function Hero() {
  return (
    <div className="border border-red-200">
      <section className="relative bg-[url(https://images.unsplash.com/photo-1556484687-30636164638b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80)] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/25"></div>

        <div className="relative mx-auto w-full px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-24">
          <div className="max-w-xl text-center sm:text-left">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Join hands
              <strong className="block font-extrabold text-blue-900">
                Make a difference.
              </strong>
            </h1>

            <p className="mt-8 max-w-lg sm:text-xl sm:leading-relaxed font-medium">
              Discover the fulfillment of giving back to your own kind with our
              diverse range of community service programs that make a positive
              impact.
            </p>

            <div className="mt-16 flex flex-wrap gap-4 text-center">
              <Link
                to="/register"
                className="block w-full rounded bg-cyan-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
              >
                Get Started
              </Link>

              <ScrolLink
                to="about"
                smooth={true}
                duration={500}
                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-blue-800 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
              >
                Learn More
              </ScrolLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
