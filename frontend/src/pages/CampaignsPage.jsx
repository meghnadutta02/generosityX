import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, Pagination } from "@mui/material";
import axios from "axios";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      let url = "/api/campaigns/search";
      if (selectedCity) {
        url = `/api/campaigns/search/?city=${selectedCity}`;
      }
      const result = await axios.get(url);
      setCampaigns(result.data);
    };
    fetchData();
  }, [selectedCity]);

  const totalItems = campaigns.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = campaigns.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <div className=" container pt-10 relative bg-[url(https://assets2.hrc.org/files/images/resources/Zoom_Background_HRC_Pattern_Preview.png)]">
      <div className="lg:px-24 inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-b sm:from-white/60 sm:to-white/25">
        <h2 className="text-4xl text-center font-bold tracking-tight text-gray-900 m-8 pt-12">
          Campaigns
        </h2>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center justify-center mx-auto my-4">
            <label className="mr-2 text-2xl font-bold">
              Search in your City
            </label>

            <input
              type="text"
              placeholder="City"
              value={selectedCity}
              onChange={handleCityChange}
              className="mr-2 p-2 border border-gray-400 rounded-md"
            />
            <button
              onClick={() => {
                setSelectedCity("");
              }}
              className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentItems.map((campaign) => (
            <div
              key={campaign._id}
              className="bg-white border-2 border-gray-700 rounded-xl shadow-md p-4 transition-all duration-300 hover:shadow-lg"
            >
              <Link to={`/campaigns/${campaign._id}`}>
                <div className="h-40 flex justify-center">
                  <img
                    src={campaign.image}
                    alt="Campaign image"
                    className="h-full object-cover object-center"
                  />
                </div>
                <div className="mt-2">
                  <h3 className="text-lg font-bold text-gray-800">
                    {campaign.name}
                  </h3>
                  <p className="mt-1 text-lg text-gray-600">{campaign.city}</p>
                  <p className="mt-1 text-lg font-semibold text-gray-800">
                    ${campaign.goal}
                  </p>
                  <p className="mt-1 text-lg  text-gray-800">
                    Date :
                    {campaign.startDate.replaceAll("-", "/").substring(5, 10)}-
                    {campaign.endDate.replaceAll("-", "/").substring(5, 10)}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="py-8">
          <Typography
            variant="body1"
            className="text-white"
            component="div"
            align="center"
          >
            Page {currentPage} of {totalPages}
          </Typography>
          <div className="pb-8 px-96">
            <Pagination
              className=" flex justify-center bg-white rounded-full p-4"
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
