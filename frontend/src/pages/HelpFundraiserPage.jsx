import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Alert } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import { Link } from "react-router-dom";
import "../App.css";
import { CircularProgress } from "@mui/material";
export default function HelpFundraiserPage() {
  const [fundraisers, setFundraisers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      let url = "/api/fundraisers";
      const result = await axios.get(url);
      setFundraisers(result.data.fundraisers);
      setIsLoading(false);
    };

    fetchData();
  }, []);
  let currentDate = new Date();
  let futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 5);

  return (
    <div
      style={{ minHeight: "70vh" }}
      className="container p-16 py-24 lg:px-60 fundraiser-mesh "
    >
      <h2 className="text-4xl font-bold text-center mb-8">
        Help these fundraisers
      </h2>
      {isLoading ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {fundraisers.map((fundraiser) => (
            <div className="rounded-3xl border-red-500 shadow-lg shadow-red-700">
              <Card
                sx={{ maxWidth: 345, borderRadius: "10px" }}
                className="h-full p-4"
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {fundraiser.creator.name.charAt(0)}
                    </Avatar>
                  }
                  title={
                    <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                      {fundraiser.title}
                    </span>
                  }
                  subheader={fundraiser.creator.name}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={fundraiser.image[0].path}
                  alt="Fundraiser image"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Target : {fundraiser.goalAmount.toLocaleString("en-US")}{" "}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Funds raised :{" "}
                    {fundraiser.currentAmount.toLocaleString("en-US")}{" "}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <Link
                    to={`/help-fundraiser/${fundraiser._id}`}
                    className=" bg-blue-300 rounded-xl hover:scale-110 transition ease-in-out delay-100 mx-auto"
                  >
                    <IconButton aria-label="add to favorites">
                      <PaymentsIcon />
                      <span className="text-base ml-2">Contribute</span>
                    </IconButton>
                  </Link>
                </CardActions>
                {currentDate <= new Date(fundraiser.endDate) &&
                  new Date(fundraiser.endDate) <= futureDate && (
                    <Alert
                      severity="warning"
                      sx={{ padding: "0.5%", backgroundColor: "transparent",display:"flex",justifyContent:"center"}}
                    >
                      Deadline is approaching!
                    </Alert>
                  )}
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
