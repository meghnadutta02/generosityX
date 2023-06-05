import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@mui/material";
import { useParams } from "react-router-dom";
import CommentPage from "./CommentPage";
import {toast } from "react-toastify";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
export default function MoneyDonationPage(props) {
  const { id } = useParams();
  const [submit, setSubmit] = useState(false);

  const [clientSecret, setClientSecret] = useState("");
  const [data, setData] = useState({
    amount: "",
    name: "",
    comments: "",
    email: "",
    phoneNumber: "",
  });
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const [donated, setDonated] = useState(false);
  const [failed, setFailed] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { amount } = data;
    if (amount < 10 ) {
      toast.error("Minimum donation amount is $10");
      return;
    }
    else if(amount > 10000)
    {
      toast.error("Maximum donation amount is $10,000");
      return;
    }
    setSubmit(true);
  };
  

  useEffect(() => {
    const fetchData = async () => {
      if (submit) {
        try {
          const url = `/api/donations/request/money/${id}`;
          const response = await axios.post(url, data);
          setClientSecret(response.data.clientSecret);
        } catch (error) {
          setFailed(true);
          console.log(error);
          setSubmit(false);
          toast.error("Something went wrong");
        }
      }
    };

    fetchData();
  }, [submit, failed]);
  useEffect(() => {
    const confirmPayment = async () => {
      if (!clientSecret || !submit) return;

      try {
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

        if (result.error) {
          // Handle payment error
          console.log("Payment failed:", result.error.message);
          setFailed(true);
        } else {
          // Payment succeeded
          const url = `/api/donations/donate/money/${id}`;
          const response = await axios.post(url, data);
          console.log("Payment succeeded:", response.data);
          setDonated(true);
          setFailed(false);
          await props.donate();
        }
        setSubmit(false); // Reset the submit state after payment confirmation for subsequent form submissions
      } catch (error) {
        // Handle any other errors
        setSubmit(false);
        console.log("An error occurred:", error.message);
        setFailed(true);
        setSubmit(false);
      }
    };

    confirmPayment();
  }, [clientSecret,id]);

  return (
    <div>
      {donated ? (
        <>
          <Alert
            severity="success"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              fontSize: "larger",
            }}
          >
            <AlertTitle>Your payment was successful!</AlertTitle>
            <strong>Thank you for your contribution</strong>
          </Alert>
          <CommentPage />
        </>
      ) : (
        <form>
          {failed && (
            <Alert severity="error">
              <AlertTitle>Payment failed!</AlertTitle>
              <strong>Please try again</strong>
            </Alert>
          )}
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
                      min={10}
                      max={10000}
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
          {/* Payment Method section */}
          <div className="pb-4">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900">
              Payment Method
            </h2>
            <div className="mt-10">
              <div>
                <p>Card Details</p>
                {/* Card Element */}
                <CardElement />
              </div>
            </div>
          </div>
          <div className="m-16 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              disabled={submit} // Disable the button when submit is true
              onClick={handleSubmit}
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
          </div>
        </form>
      )}
    </div>
  );
}
