import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

export default function FundraiserDetailsPage() {
  const { id } = useParams();

  const [fundraiser, setFundraiser] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      let url = `/api/fundraisers/getOne/${id}`;
      const result = await axios.get(url);
      setFundraiser(result.data);
    };
    fetchData();
  }, []);
  const endDate = fundraiser.endDate
    ? fundraiser.endDate.replaceAll("-", "/").substring(0, 10)
    : "";

  return (
    <div className="p-24 fundraiser-mesh">
      <div className="p-8 mt-8 grid md:grid-cols-2 gap-6 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-50 border border-gray-100">
        <div className="">
          <CardHeader
            title={
              <Typography variant="h4" fontWeight="bold">
                {fundraiser.title}
              </Typography>
            }
          />
          {fundraiser.image &&
            fundraiser.image.map((i, index) => (
              <CardMedia
                key={index}
                component="img"
                height="194"
                image={i.path}
                alt="fundraiser image"
              />
            ))}

          <CardContent>
            <Typography variant="h5" color="text.secondary" fontWeight="bold">
              Target : ${fundraiser.currentAmount}{" "}
            </Typography>
            <Typography variant="h5" color="text.secondary" fontWeight="bold">
              Funds raised : ${fundraiser.goalAmount}{" "}
            </Typography>
            <Typography variant="h5" color="text.secondary" fontWeight="bold">
              Deadline : {endDate}{" "}
            </Typography>
          </CardContent>
          <CardContent>
            {fundraiser.creator && (
              <Typography paragraph>
                Created by: {fundraiser.creator.name}
              </Typography>
            )}

            <Typography paragraph fontWeight="bold">
              Details:
            </Typography>
            <Typography paragraph>{fundraiser.description}</Typography>
          </CardContent>
        </div>
        <form>
          <div className="space-y-4 px-4">
            <div className="pb-2">
              <h1 className="text-center font-semibold text-3xl">
                Help the Cause
              </h1>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4 ">
                  <label
                    htmlFor="username"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Enter amount to contritbute
                  </label>

                  <div className="flex mt-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      autoComplete="amount"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-6"
                      placeholder="10"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Your reason to help
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-lg sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-4">
              <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Full name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Phone number
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="m-16 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-lg font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 py-2 px-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
