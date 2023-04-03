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
import PaymentsIcon from "@mui/icons-material/Payments";
import { Link } from "react-router-dom";
import "../App.css";

export default function HelpFundraiserPage() {
  const [fundraisers, setFundraisers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let url = "/api/fundraisers";
      const result = await axios.get(url);
      setFundraisers(result.data.fundraisers);
    };
    fetchData();
  }, []);

  return (
    <div className="container p-16 py-24 lg:px-60 fundraiser-mesh">
      <h2 className="text-4xl font-bold text-center mb-8">
        Help these fundraisers
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {fundraisers.map((fundraiser) => (
          <div className="rounded-lg border-red-500 shadow-lg shadow-red-400">
            <Card sx={{ maxWidth: 345 }} className="rounded-2xl p-2">
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {fundraiser.creator.name.charAt(0)}
                  </Avatar>
                }
                title={fundraiser.title}
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
                  Funds raised : {fundraiser.currentAmount}{" "}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Target : {fundraiser.goalAmount}{" "}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Link
                  to={`/help-fundraiser/${fundraiser._id}`}
                  className=" bg-blue-300 rounded-md hover:scale-110 transition ease-in-out delay-100"
                >
                  <IconButton aria-label="add to favorites">
                    <PaymentsIcon />{" "}
                    <span className="text-base ml-2">Contribute</span>
                  </IconButton>
                </Link>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
