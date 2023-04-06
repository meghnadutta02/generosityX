import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function CampaignCarousel() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let url = "/api/campaigns/recent";
      const result = await axios.get(url);
      setCampaigns(result.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="py-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Upcoming Campaigns
        </h2>

        <div className="mt-6 p-8 flex overflow-x-auto">
          {campaigns.map((campaign) => (
            <div
              className="bg-orange-200 rounded-md mr-4 border-2 border-black min-h-50 shadow-lg shadow-blue-600 hover:scale-110 transition ease-in-out delay-50"
              key={campaign._id}
            >
              <Link to={`/campaigns/${campaign._id}`}>
                <div className="h-40 flex justify-center">
                  <img
                    src={campaign.image}
                    alt="Campaign image"
                    className="h-full object-cover object-center"
                  />
                </div>
                <div className="mx-4 px-4">
                  <h3 className="text-lg font-bold">{campaign.name}</h3>
                  <p className="mt-1 text-lg font-medium">{campaign.city}</p>
                  {/* <p className="mt-1 text-lg font-semibold text-gray-800">
                    ${campaign.goal}
                  </p> */}
                  <p className="mt-1 text-lg font-normal">
                    Date :
                    {campaign.startDate.replaceAll("-", "/").substring(5, 10)}-
                    {campaign.endDate.replaceAll("-", "/").substring(5, 10)}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mb-24">
        <Link to="/campaigns">
          <div className="text-sm font-medium hover:bg-pink-300 border-2 border-red-400 rounded-md p-2">
            View All Campaigns
          </div>
        </Link>
      </div>
    </>
  );
}
