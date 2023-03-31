import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useParams } from "react-router-dom";
export default function CampaignDetailsPage(props) {
  const { id } = useParams();
  const [buttonText, setButtonText] = useState("RSVP");
  const [campaign, setCampaign] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const apiCall = async () => {
    console.log("here");
    await axios.get(`/api/campaigns/attend/${id}`);
  };
  const [alertOpen, setAlertOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      let url = `/api/campaigns/getOne/${id}`;
      const result = await axios.get(url);
      setCampaign(result.data);
    };
    fetchData();
  }, []);
  // The issue with campaign.startDate might be related to the fact that it is accessed inside the useEffect hook which runs only once after the component mounts. At that point, campaign is an empty object because the API call has not completed yet.
  const startDate = campaign.startDate
    ? campaign.startDate.replaceAll("-", "/").substring(0, 10)
    : "";
  const endDate =
    campaign && campaign.endDate
      ? campaign.endDate.replaceAll("-", "/").substring(0, 10)
      : "";
  const handleClick = () => {
    setAlertOpen(true);
    setButtonText("Submitted");
    setButtonDisabled(true);
  };

  return (
    <div
      className="pt-24 bg-[url(https://assets2.hrc.org/files/images/resources/Zoom_Background_HRC_Pattern_Preview.png)]
    bg-center bg-cover bg-no-repeat fixed;"
    >
      <h2 className="text-4xl font-bold my-8 text-center">
        <span className="p-4 shadow-lg shadow-gray-300 rounded bg-white">
          {campaign.name}
        </span>
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="text-center">
          <div
            className="h-auto mx-8 mt-16 p-4 rounded-xl  backdrop-blur-lg
               [ p-8 md:p-10 lg:p-10 ]
               [ bg-gradient-to-b from-white/60 to-white/30 ]
               [ border-[1px] border-solid border-white border-opacity-30 ]
               [ shadow-black/70 shadow-2xl ]"
          >
            {campaign.image}
            <div className="flex my-8 justify-center">
              <Link to="#" onClick={apiCall}>
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  onClick={handleClick}
                  disabled={buttonDisabled}
                >
                  {buttonText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-2xl text-white flex justify-center mb-4">
            Campaign details
          </p>
          <div
            className="border-2 rounded-xl mx-8 border-black  backdrop-blur-lg
               [ p-8 md:p-10 lg:p-10 ]
               [ bg-gradient-to-b from-white/60 to-white/30 ]
               [ border-[1px] border-solid border-white border-opacity-30 ]
               [ shadow-black/70 shadow-2xl ]"
          >
            <List sx={{ width: "100%" }}>
              <ListItem>
                <ListItemText
                  secondary={"$" + campaign.goal}
                  primary="Goal Amount"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  secondary={campaign.description}
                  primary="Description"
                />
              </ListItem>
              <ListItem>
                <ListItemText secondary={campaign.city} primary="City" />
              </ListItem>
              <ListItem>
                <ListItemText secondary={campaign.address} primary="Venue" />
              </ListItem>
              <ListItem>
                <ListItemText secondary={startDate} primary="Start Date" />
              </ListItem>
              <ListItem>
                <ListItemText secondary={endDate} primary="End Date" />
              </ListItem>

              <ListItem>
                <ListItemText
                  secondary={campaign.organizer}
                  primary="Organizer"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  secondary={campaign.contactEmail}
                  primary="Email"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  secondary={campaign.contactPhone}
                  primary="Phone Number"
                />
              </ListItem>
            </List>
          </div>
        </div>
        <Alert
          className="mx-auto"
          severity="success"
          sx={{ mt: 2, display: alertOpen ? "block" : "none" }}
          onClose={() => setAlertOpen(false)}
        >
          Thanks for joining us in this campaign !
        </Alert>
      </div>
    </div>
  );
}
{
  /* <h2 className="text-2xl my-8">Specific fundraiser</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-red-300">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            title={
              <Typography variant="h5" fontWeight="bold">
                {fundraisers[0].title}
              </Typography>
            }
          />

          <CardMedia
            component="img"
            height="194"
            image={fundraisers[0].image}
            alt="Paella dish"
          />
          <CardContent>
            <Typography
              variant="body1"
              color="text.secondary"
              fontWeight="bold"
            >
              Funds raised : {fundraisers[0].current}{" "}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              fontWeight="bold"
            >
              Target : {fundraisers[0].target}{" "}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              fontWeight="bold"
            >
              Deadline : September 19,2023{" "}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography paragraph fontWeight="bold">
              Details:
            </Typography>
            <Typography paragraph>{fundraisers[0].description}</Typography>
          </CardContent>
        </Card>
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
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Enter amount to contritbute
                  </label>

                  <div className="flex mt-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      autoComplete="amount"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="60,000"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Your reason to help
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-4">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Full name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone number
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div> */
}
