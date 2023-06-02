import React from "react";
const DonateButton = ({ amount, submit }) => {
  const handler = (token) => {
    console.log("Processing payment:", token);
    submit();
  };
  return (
      <button
        type="submit"
        onClick={handler}
        className="rounded-md bg-indigo-600 py-3 px-4 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        style={{ display: "flex", alignItems: "center" }}
      >
        Donate
        <img
          src="/images/heart.png"
          alt="donate icon"
          style={{ width: "1em", height: "1em", marginRight: "0.5em" }}
          className="mx-2"
        />
      </button>
    
  );
};

export default DonateButton;
