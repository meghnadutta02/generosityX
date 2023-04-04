import React, { useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

export default function ItemDonationPage() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const fetchLocationDetails = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setError(null);

          axios
            .get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiYW5rdXNocm95MDgiLCJhIjoiY2xmeHlydmV5MDV6cDNvbXNqYmM3ejR5bCJ9.Y-mQFNAzEIiDg37errtwOg`
            )
            .then((response) => {
              const { features } = response.data;
              const address = features[0].text + features[2].text;
              const pincode = features[1].text;
              const city = features[3].text;
              const state = features[4].text;
              const country = features[5].text;
              setAddress(address);
              setPincode(pincode);
              setCity(city);
              setState(state);
              setCountry(country);

              setIsLoading(false);
              console.log(features);
            })
            .catch((error) => {
              setLocation(null);
              setIsLoading(false);
              setAddress("");
              setError("Failed to fetch location details");
            });
        },
        (error) => {
          setLocation(null);
          setIsLoading(false);
          setError(error.message);
        }
      );
    } else {
      setLocation(null);
      setIsLoading(false);
      setError("Geolocation is not supported by this browser");
    }
  };

  return (
    // bg-[url(https://img.freepik.com/free-vector/purple-green-background_23-2150260672.jpg?size=626&ext=jpg)] bg-center bg-no-repeat bg-cover
    <div className="container p-28 lg:px-60  bg-[url(https://img.freepik.com/free-vector/purple-green-background_23-2150260672.jpg?size=626&ext=jpg)] bg-center bg-no-repeat bg-cover">
      <form className="relative ">
        <div className="space-y-12 p-8 bg-gray rounded-xl bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-50 border border-black">
          <div className="border-b border-black/10 pb-12">
            <h1 className="text-center font-bold text-4xl">Donate Items</h1>
            <p className="mt-1 text-lg text-center text-black">
              Thanks for choosing to help the lesser blessed people.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-md font-medium leading-6 text-black"
                >
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-black focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-black sm:text-md">
                      togethergrow.com/
                    </span>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-black placeholder:text-black focus:ring-0 sm:text-md sm:leading-6"
                      placeholder="janesmith"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-md font-medium leading-6 text-black"
                >
                  Item description
                </label>
                <p className="mt-3 text-md leading-6 text-black">
                  {" "}
                  What are you donating, how does it help the community, how
                  many people does it cater ?
                </p>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border-0 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-md sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-md font-medium leading-6 text-black"
                >
                  Upload an image
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-black px-6 py-10">
                  <div className="text-center">
                    <div className="mt-4 flex text-md leading-6 text-black">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer px-4 rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-black">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-black/10 pb-12">
            <h2 className="text-3xl font-semibold leading-7 text-black">
              Personal Information
            </h2>
            <p className="mt-1 text-md leading-6 text-black">
              Use your residential address where we can reach out.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-md font-medium leading-6 text-black"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-md font-medium leading-6 text-black"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-md font-medium leading-6 text-black"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                  />
                </div>
              </div>

              {error && <div>{error}</div>}
              <button
                className="bg-blue-400 rounded-xl hover:bg-blue-500"
                onClick={fetchLocationDetails}
              >
                Use current location
              </button>
              {isLoading && (
                <span className="text-center">
                  <FaSpinner className="animate-spin text-blue-500 inline-block mx-auto" />{" "}
                  Loading...
                </span>
              )}

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-md font-medium leading-6 text-black"
                >
                  Country
                </label>
                <div className="mt-2">
                  <input
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-md sm:leading-6"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-md font-medium leading-6 text-black"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-md font-medium leading-6 text-black"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-md font-medium leading-6 text-black"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="region"
                    id="region"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-md font-medium leading-6 text-black"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-md font-semibold leading-6 text-black"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 py-2 px-3 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
