import React, { useState, useEffect } from "react";

import axios from "axios";

import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import MoneyDonationPage from "./MoneyDonationPage";

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
        <MoneyDonationPage/>
      </div>
    </div>
  );
}
