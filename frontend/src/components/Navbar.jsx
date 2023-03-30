import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="z-50 border-2 border-red-600">
      <Link to="/">
        {" "}
        <button> Logo </button>{" "}
      </Link>
      <Link to="/about">
        {" "}
        <button> About </button>{" "}
      </Link>
      <Link to="/register">
        {" "}
        <button> Register </button>{" "}
      </Link>
      Navbar
    </div>
  );
}
