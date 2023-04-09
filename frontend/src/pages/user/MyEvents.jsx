import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/campaigns/myevents");
        console.log(data);
        if(data)
        setEvents(data);
      } catch (err) {
        toast.error(err.message);
      }finally
      {
        setIsLoading(false)
      }
    };
    fetchData();
  },[]);
  console.log(events);
  return (
    <div>
    {isLoading? <CircularProgress/> :
     <div className="px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="bg-white border-2 border-gray-700 rounded-xl shadow-md p-4 transition-all duration-300 hover:shadow-lg"
                >
                  <Link to='#'>
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
                      {/* <p className="mt-1 text-lg font-semibold text-gray-800">
                        ${event.goal}
                      </p> */}
                      <p className="mt-1 text-lg  text-gray-800">
                        Date :
                        {event.startDate
                          .replaceAll("-", "/")
                          .substring(5, 10)}
                        -
                        {event.endDate.replaceAll("-", "/").substring(5, 10)}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
}
    </div>
  );
}
