import React, { useEffect, useState } from "react";
import { Alert, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function MyEventsPage() {
  const [events, setEvents] = useState([]);
  const [aEvents, setAEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/campaigns/myevents");
        const res = await axios.get("/api/campaigns/attendedEvents");
        if (res.data) setAEvents(res.data);
        if (data) setEvents(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      style={{ minHeight: "90vh", paddingTop: "100px" }}
      className="container p-16 py-10 lg:px-50"
    >
      <h2 className="text-4xl font-bold">Upcoming Campaigns</h2>
      {isLoading ? (
        <div className=" flex justify-center" style={{margin:"10%"}}>
          <div className="flex items-center">
            <CircularProgress />
          </div>
        </div>
      ) : events.length > 0 ? (
        <div className="flex items-center justify-center">
          <div className="container py-10">
            <div className="px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="bg-white border-2 border-gray-700 rounded-xl shadow-md p-4 transition-all duration-300 hover:shadow-lg"
                >
                  <Link to="#">
                    <div className="h-40 flex justify-center">
                      <img
                        src={event.image}
                        alt="event image"
                        className="h-full object-cover object-center"
                      />
                    </div>
                    <div className="mt-2">
                      <h3 className="text-lg font-bold text-gray-800">
                        {event.name}
                      </h3>
                      <p className="mt-1 text-lg text-gray-600">{event.city}</p>
                      <p className="mt-1 text-lg  text-gray-800">
                        Date:
                        {event.startDate
                          .replaceAll("-", "/")
                          .substring(5, 10)}{" "}
                        -{event.endDate.replaceAll("-", "/").substring(5, 10)}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
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
          You have no upcoming campaigns. Go to{" "}
          <Link to="/campaigns" className="text-blue-500 underline">
            campaigns
          </Link>
        </Alert>
      )}

      {aEvents.length > 0 && (
        <>
          <h2 className="text-4xl font-bold mt-3">Attended Campaigns</h2>
          <div className="flex items-center justify-center">
            <div className="container py-10">
              <div className="px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {aEvents.map((event) => (
                  <div
                    key={event._id}
                    className="bg-white border-2 border-gray-700 rounded-xl shadow-md p-4 transition-all duration-300 hover:shadow-lg"
                  >
                    <Link to="#">
                      <div className="h-40 flex justify-center">
                        <img
                          src={event.image}
                          alt="event image"
                          className="h-full object-cover object-center"
                        />
                      </div>
                      <div className="mt-2">
                        <h3 className="text-lg font-bold text-gray-800">
                          {event.name}
                        </h3>
                        <p className="mt-1 text-lg text-gray-600">
                          {event.city}
                        </p>
                        <p className="mt-1 text-lg  text-gray-800">
                          Date:
                          {event.startDate
                            .replaceAll("-", "/")
                            .substring(5, 10)}{" "}
                          -{event.endDate.replaceAll("-", "/").substring(5, 10)}
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
    </div>
  );
}
