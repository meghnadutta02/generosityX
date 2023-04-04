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
      className="pt-24 bg-[url(https://img.freepik.com/free-vector/sketches-modern-city-background_23-2147556600.jpg?w=740&t=st=1680546909~exp=1680547509~hmac=dd976456aa5dddd4d07e0ed31480b8a92ed472851ab9b91a49b48f2851f1899b)]
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
