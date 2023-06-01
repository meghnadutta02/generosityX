import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@mui/material";
import { useParams } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CommentPage from "./CommentPage";
export default function MoneyDonationPage(props) {
  const { id } = useParams();
  const [submit, setSubmit] = useState(false);
  const [data, setData] = useState({
    amount: "",
    name: "",
    comments: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const [donated, setDonated] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (submit) {
        try {
          const url = `/api/donations/donate/money/${id}`;
          const response = await axios.post(url, data);
          const { successful } = response.data;
          if (successful) {
            setDonated(true);
            props.donate();
          }
        } catch (error) {
          alert("Something went wrong");
        }
      }
    };

    fetchData();
  }, [submit]);

  return (
    <div>
      {donated ? (
        <>
          <Alert severity="success" style={{backgroundColor: "rgba(255, 255, 255, 0.2)",fontSize: "larger" }}>
            <AlertTitle>Your payment was successful!</AlertTitle>
            <strong>Thank you for your contribution</strong>
          </Alert>
          <CommentPage/>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
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
                      onChange={handleChange}
                      value={data.amount}
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
                      id="comments"
                      name="comments"
                      onChange={handleChange}
                      value={data.comments}
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
                      name="name"
                      id="name"
                      onChange={handleChange}
                      value={data.name}
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
                      value={data.email}
                      onChange={handleChange}
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
                      name="phoneNumber"
                      id="phoneNumber"
                      onChange={handleChange}
                      value={data.phoneNumber}
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
      )}
    </div>
  );
}
