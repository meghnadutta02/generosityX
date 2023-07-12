import React, { useEffect, useState } from "react";
import { Alert, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function MyFundraisersPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/fundraisers/myfundraisers");
        if (data) setEvents(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const verifiedFundraisers = events.filter((event) => event.isVerified);
  const unverifiedFundraisers = events.filter((event) => !event.isVerified);
  const date=new Date();
  return (
    <div
      style={{ minHeight: "90vh", paddingTop: "100px" }}
      className="container p-16 py-10 lg:px-50"
    >
      {isLoading ? (
        <div className="mt-4 flex justify-center" style={{ paddingTop: "10%" }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {events.length > 0 ? (
            <>
              <h2 className="text-4xl font-bold">My Fundraisers</h2>

              {/* Verified Fundraisers */}
              {verifiedFundraisers.length > 0 && (
                <>
                  <h3 className="text-2xl font-bold mt-8">
                    Verified Fundraisers
                  </h3>
                  <div className="flex items-center justify-center">
                    <div className="container py-10">
                      <div className="px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {verifiedFundraisers.map((event) => (
                          <div
                            key={event._id}
                            className="bg-white border-2 border-gray-700 rounded-xl shadow-md p-3 transition-all duration-300 hover:shadow-lg"
                          >
                            {new Date(event.endDate) < date && (
                              <Alert
                                severity="info"
                                style={{
                                  background: "none",
                                  padding: "0",
                                  marginBottom: "0.5%",
                                }}
                              >
                                Deadline has expired
                              </Alert>
                            )}

                            <Link to={new Date(event.endDate) < new Date() ? "#" : `/help-fundraiser/${event._id}`}>
                              <div className="h-40 flex justify-center">
                                <img
                                  src={event.image[0].path}
                                  alt="event image"
                                  className="h-full object-cover object-center"
                                />
                              </div>
                              <div className="mt-2">
                                <h3 className="text-lg font-bold text-gray-800">
                                  {event.title}
                                </h3>
                                <p className="mt-1 text-lg font-semibold text-gray-800">
                                  Target: $
                                  {event.goalAmount.toLocaleString("en-US")}
                                </p>
                                <p className="mt-1 text-lg font-semibold text-gray-800">
                                  Funds raised: $
                                  {event.currentAmount.toLocaleString("en-US")}
                                </p>
                                <p className="mt-1 text-lg text-gray-800">
                                  Deadline:{" "}
                                  {event.endDate
                                    .replaceAll("-", "/")
                                    .substring(5, 10)}
                                </p>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Unverified Fundraisers */}
              {unverifiedFundraisers.length > 0 && (
                <>
                  <h3 className="text-2xl font-bold mt-8">
                    Unverified Fundraisers
                  </h3>
                  <div className="flex items-center justify-center mt-4">
                    <div className="container py-10">
                      <div className="px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {unverifiedFundraisers.map((event) => (
                          <div
                            key={event._id}
                            className="bg-white border-2 border-gray-700 rounded-xl shadow-md p-4 transition-all duration-300 hover:shadow-lg"
                          >
                            <Link to={`/delete-fundraiser/${event._id}`}>
                              <div className="h-40 flex justify-center">
                                <img
                                  src={event.image[0].path}
                                  alt="event image"
                                  className="h-full object-cover object-center"
                                />
                              </div>
                              <div className="mt-2">
                                <h3 className="text-lg font-bold text-gray-800">
                                  {event.title}
                                </h3>
                                <p className="mt-1 text-lg font-semibold text-gray-800">
                                  Target: $
                                  {event.goalAmount.toLocaleString("en-US")}
                                </p>
                                <p className="mt-1 text-lg text-gray-800">
                                  Deadline:{" "}
                                  {event.endDate
                                    .replaceAll("-", "/")
                                    .substring(5, 10)}
                                </p>
                                <Alert
                                  severity="error"
                                  sx={{
                                    padding: "0.7%",
                                    marginTop: "2%",
                                  }}
                                >
                                  Awaiting verification by admin.
                                </Alert>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <Alert
              severity="info"
              sx={{
                width: "50vw",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "2%",
              }}
            >
              You have not created any fundraisers. Go to{" "}
              <Link to="/create-fundraiser" className="text-blue-500 underline">
                Create
              </Link>{" "}
              or{" "}
              <Link to="/help-fundraiser" className="text-blue-500 underline">
                Contribute to
              </Link>{" "}
              Fundraisers
            </Alert>
          )}
        </>
      )}
    </div>
  );
}
