import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { Snackbar } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useParams } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function CampaignDetailsPage(props) {
  const { id } = useParams();
  let userId;
  const localUser = localStorage.getItem("user");
  const sessionUser = sessionStorage.getItem("user");
  if (localUser) {
    userId = JSON.parse(localUser)._id;
  } else if (sessionUser) {
    userId = JSON.parse(sessionUser)._id;
  }
  const [buttonText, setButtonText] = useState("RSVP");
  const [campaign, setCampaign] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] =
    localStorage.getItem(`buttonDisabled_${id}_${userId}`) === "true"
      ? useState(true)
      : useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOpen1, setAlertOpen1] = useState(false);
  const apiCall = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.post(`/api/campaigns/attend/${id}`);
      if (data.successful) {
        setAlertOpen(true);
        setButtonText("Submitted");
        setButtonDisabled(true);
        localStorage.setItem(`buttonDisabled_${id}_${userId}`, "true");
      }
    } catch (error) {
      setAlertOpen1(true);
      console.error("API call error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let url = `/api/campaigns/getOne/${id}`;
      const result = await axios.get(url);
      setCampaign(result.data);
    };
    fetchData();
  }, []);

  const startDate = campaign.startDate
    ? campaign.startDate.replaceAll("-", "/").substring(0, 10)
    : "";
  const endDate =
    campaign && campaign.endDate
      ? campaign.endDate.replaceAll("-", "/").substring(0, 10)
      : "";

  return (
    <div className="pt-24 ">
      <h2 className="text-4xl font-bold my-8 text-center">
        <span className="p-4 shadow-lg shadow-gray-300 rounded ">
          {campaign.name}
        </span>
      </h2>
      <Snackbar
        open={alertOpen}
        autoHideDuration={5000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Thanks for joining us!
        </Alert>
      </Snackbar>

      <Snackbar
        open={alertOpen1}
        autoHideDuration={3000}
        onClose={() => setAlertOpen1(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Please try again!
        </Alert>
      </Snackbar>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="text-center">
          <div
            className="h-auto mx-8 mt-16 p-4 rounded-xl  backdrop-blur-lg
               [ p-8 md:p-10 lg:p-10 ]
               [ bg-gradient-to-b from-white/60 to-white/30 ]
               [ border-[1px] border-solid border-white border-opacity-30 ]
               [ shadow-black/70 shadow-2xl ]"
          >
            <div className="mx-auto w-5/6 flex justify-center">
              <img
                src={campaign.image && campaign.image.path}
                alt="campaign image"
              />
            </div>

            <div className="flex my-8 justify-center">
              <Button
                variant="contained"
                color="success"
                type="submit"
                onClick={apiCall}
                disabled={buttonDisabled}
              >
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-2xl flex justify-center mb-4">Campaign details</p>
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
      </div>
      {isLoading && (
        <Backdrop open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
}
