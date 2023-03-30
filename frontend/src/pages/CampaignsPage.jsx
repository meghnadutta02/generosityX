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
 

  const totalItems =campaigns.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems =campaigns.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <div className="container px-16 lg:px-24 ">
      <h2 className="text-3xl text-center font-bold tracking-tight text-gray-900 m-8">
        Campaigns
      </h2>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <label className="mr-2">Search in your City</label>

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentItems.map((campaign) => (
          <div
            key={campaign._id}
            className="bg-white rounded-md shadow-md p-4 transition-all duration-300 hover:shadow-lg"
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
                <h3 className="text-lg font-semibold text-gray-800">
                  {campaign.name}
                </h3>
                <p className="mt-1 text-sm text-gray-600">{campaign.city}</p>
                <p className="mt-1 text-lg font-bold text-gray-800">
                  ${campaign.goal}
                </p>
                <p className="mt-1 text-lg font-bold text-gray-800">
                  {campaign.startDate.replaceAll("-","/").substring(5,10)}-{campaign.endDate.replaceAll("-","/").substring(5,10)}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="my-8">
        <Typography variant="body1" component="div" align="center">
          Page {currentPage} of {totalPages}
        </Typography>
        <div className="mb-8">
          <Pagination
            className=" flex justify-center"
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
}
