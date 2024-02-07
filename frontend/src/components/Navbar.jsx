import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";import Logo from "../assets/generosityLogo.png";

import {
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaBars,
  FaTimes,
  FaUser
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { Link as ScrolLink } from "react-scroll";
import { logout, reset } from "../redux/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      {/* Sidebar */}
      <div className=" md:flex fixed flex-col top-[35%] right-0 z-10">
        <ul>
          <li className="w-[160px] h-[60px] flex justify-between items-center mr-[-100px] hover:ml-[-100px] duration-300 bg-blue-600 px-4">
            <a
              className="flex justify-between items-center w-full text-gray-300"
              href="/"
            >
              <FaLinkedin size={30} />
              Linkedin
            </a>
          </li>

          <li className="w-[160px] h-[60px] flex justify-between items-center mr-[-100px] hover:ml-[-100px] duration-300 bg-red-600 px-4">
            <a
              className="flex justify-between items-center w-full text-gray-300"
              href="/"
            >
              <HiOutlineMail size={30} /> Email
            </a>
          </li>
          <li className="w-[160px] h-[60px] flex justify-between items-center mr-[-100px] hover:ml-[-100px] duration-300 bg-blue-600 px-4">
            <a
              className="flex justify-between items-center w-full text-gray-300"
              href="/"
            >
              <FaFacebook size={30} /> Facebook
            </a>
          </li>
          <li className="w-[160px] h-[60px] flex justify-between items-center mr-[-100px] hover:ml-[-100px] duration-300 bg-[#565f69] px-4">
            <a
              className="flex justify-between items-center w-full text-gray-300"
              href="/"
            >
              <FaTwitter size={30} /> Twitter
            </a>
          </li>
        </ul>
      </div>

      {/* Navbar */}
      <div className="bg-teal-700 shadow-xl fixed top-0 right-0 left-0 z-10 w-full border-b-2 ">
        <div className="container mx-auto px-2 py-2">
          <div className="flex items-center justify-between">
            <Link to="/">
              <div className="flex flex-row">
                <img src={Logo} className="h-12" alt="Brand logo" />
                <span className="pt-2 font-bold text-3xl text-gray-200">
                  GenerosityX
                </span>
              </div>
            </Link>
            {user && user.isAdmin ? ( // Check if the user is an admin
              <button
                onClick={() => {
                  dispatch(logout());
                  dispatch(reset());
                  navigate("/");
                }}
                style={{
                  padding: "0.35% 0.65%",
                  borderRadius: "4px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
                className=" text-white p-1 hover:bg-white hover:bg-opacity-10"
              >
                Sign Out
              </button>
            ) : (
              <>
                <div className="hover:cursor-pointer hidden sm:flex sm:items-center">
                  <ScrolLink
                    to="about"
                    smooth={true}
                    duration={500}
                    className="text-white text-lg font-semibold hover:text-amber-400 mr-4"
                  >
                    About
                  </ScrolLink>
                  <ScrolLink
                    to="contact"
                    smooth={true}
                    duration={500}
                    className="text-white text-lg font-semibold hover:text-amber-400 mr-4"
                  >
                    Contact
                  </ScrolLink>
                  <ScrolLink
                    to="campaigns"
                    smooth={true}
                    duration={500}
                    className="text-white text-lg font-semibold hover:text-amber-400 mr-4"
                  >
                    Services
                  </ScrolLink>
                  <Link
                    to="/"
                    className="text-white text-lg font-semibold hover:text-amber-400"
                  >
                    Home
                  </Link>
                </div>
                {user ? (
                  <div className="relative">
                    <button
                      onClick={handleDropdownToggle}
                      className="flex items-center text-white hover:text-amber-400 ">
                      <div className="text-2xl mr-2">
                        <FaUser/>
                      </div>
                    </button>
                    {showDropdown && (
                      <div
                        className="absolute border-2 right-0 text-md text-gray-700 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu"
                      >
                        <div className="p-1 bg-gray-200 shadow-md">
                          {user.name + " " + user.lastName}
                        </div>

                        <Link
                          to="/my-fundraisers"
                          className="block p-1 hover:bg-gray-300"
                          role="menuitem"
                        >
                          My Fundraisers
                        </Link>
                        <Link
                          to="/my-donations"
                          className="block p-1 hover:bg-gray-300 "
                          role="menuitem"
                        >
                          My Donations
                        </Link>
                        <Link
                          to="/my-events"
                          className="block p-1 hover:bg-gray-300"
                          role="menuitem"
                        >
                          My Events
                        </Link>

                        <button
                          onClick={() => {
                            dispatch(logout());
                            dispatch(reset());
                            navigate("/")
                          }}
                          className="block w-full text-left p-1 hover:bg-indigo-500 hover:text-white"
                        >
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="hidden sm:flex sm:items-center">
                    <Link
                      to="/login"
                      className="text-white text-lg font-semibold hover:text-amber-400 mr-4"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/register"
                      className="text-white text-lg font-semibold border px-4 py-2 rounded-lg hover:text-amber-400 hover:border-purple-600"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
                <div className="sm:hidden cursor-pointer">
                  <div
                    onClick={handleClick}
                    className="md:hidden z-10 text-3xl"
                  >
                    {!nav ? <FaBars style={{ color: "white" }} /> : <FaTimes />}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile screen navbar */}
      <div className={!nav ? "hidden" : "block sm:hidden bg-teal-700 py-2"}>
        <div className="flex flex-col text-white text-center text-lg font-semibold">
          <Link to="/about" className=" hover:text-amber-400 mb-1">
            About
          </Link>

          <ScrolLink
            to="contact"
            smooth={true}
            duration={500}
            className=" hover:text-amber-400 mb-1"
          >
            Contact
          </ScrolLink>

          <ScrolLink
            to="campaigns"
            smooth={true}
            duration={500}
            className="hover:text-amber-400 mb-1"
          >
            Services
          </ScrolLink>
          <Link to="/" className="hover:text-amber-400 mb-1">
            Home
          </Link>
          {user ? (
            <div className="flex justify-center items-center border-t-2 py-4 ">
              <a href="/my-fundraisers" className="">
                My Fundraisers
              </a>
              <a href="/my-donations" className="">
                My Donations
              </a>
              <a href="/my-events" className="">
                My Events
              </a>
              <button
                onClick={() => {
                  dispatch(logout());
                  dispatch(reset());
                  navigate("/")
                }}
                className="border px-4 py-2 rounded-lg hover:text-amber-400 hover:border-purple-600"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex justify-center items-center border-t-2 pt-2">
              <Link to="/login" className="hover:text-amber-400 mr-4">
                Sign in
              </Link>
              <Link to="/register" className="hover:text-amber-400 mr-4">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Navbar;