import React, { useEffect, useState } from "react";
import { Alert, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingDollar,
  faBook,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
export default function MyDonationsPage() {
  const [moneyDonations, setMoneyDonations] = useState([]);
  const [itemDonations, setItemDonations] = useState([]);
  const [foodDonations, setFoodDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://server.generosityx.app/api/donations"
        );
        setMoneyDonations(data.moneydonations);
        setFoodDonations(data.fooddonations);
        setItemDonations(data.itemdonations);
        console.log(moneyDonations);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className=" py-16 px-4 sm:px-6 lg:px-8" style={{ minHeight: "90vh" }}>
      {isLoading ? (
        <div className="flex mt-20 justify-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <h2 className="text-4xl font-bold mt-10 mb-2">Previous Donations</h2>
          {moneyDonations.length > 0 ||
          foodDonations.length > 0 ||
          itemDonations.length > 0 ? (
            <div className="container py-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {moneyDonations.length > 0 &&
                  moneyDonations.map((donation) => (
                    <Link to={`/help-fundraiser/${donation.donatedTo._id}`}>
                      <div
                        key={donation._id}
                        className="bg-white rounded-xl shadow-md p-4 transition-all duration-300 hover:shadow-lg relative"
                        style={{
                          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
                          borderBottom: "4px solid rgba(0, 0, 0, 0.3)",
                        }}
                      >
                        <div className="absolute top-1 right-1">
                          <FontAwesomeIcon
                            icon={faHandHoldingDollar}
                            style={{ color: "#229b50", fontSize: "160%" }}
                          />
                        </div>
                        <div className="mt-4">
                          <h3 className="text-lg font-bold text-gray-800">
                            {donation.donatedTo.title}
                          </h3>
                          You donated ${donation.amount}
                        </div>
                      </div>
                    </Link>
                  ))}
                {foodDonations.length > 0 &&
                  foodDonations.map((donation) => (
                    <Link to={`/food/${donation._id}`}>
                      <div
                        key={donation._id}
                        className="bg-white rounded-xl shadow-md p-4 transition-all duration-300 hover:shadow-lg relative"
                        style={{
                          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
                          borderBottom: "4px solid rgba(0, 0, 0, 0.3)",
                        }}
                      >
                        <div className="absolute top-1 right-1">
                          <FontAwesomeIcon
                            icon={faUtensils}
                            style={{ color: "#aeb3bc", fontSize: "160%" }}
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">
                            {donation.event}
                          </h3>
                          {donation.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                {itemDonations.length > 0 &&
                  itemDonations.map((donation) => (
                    <Link to={`/item/${donation._id}`}>
                      <div
                        key={donation._id}
                        className="bg-white rounded-xl shadow-md p-4 transition-all duration-300 hover:shadow-lg relative"
                        style={{
                          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
                          borderBottom: "4px solid rgba(0, 0, 0, 0.3)",
                        }}
                      >
                        <div className="absolute top-1 right-1">
                          <FontAwesomeIcon
                            icon={faBook}
                            style={{ color: "#4c76bd", fontSize: "160%" }}
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">
                            {donation.category}
                          </h3>
                          {donation.description}
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          ) : (
            <Alert
              severity="info"
              className="w-1/2 mx-auto flex items-center justify-center mt-8"
            >
              You have no previous donation records. Get started on your journey
              to helping others!
            </Alert>
          )}
        </>
      )}
    </div>
  );
}
