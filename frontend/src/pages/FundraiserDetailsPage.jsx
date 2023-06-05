import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import MoneyDonationPage from "./MoneyDonationPage";

const stripePromise = loadStripe(
  "pk_test_51NERLdSFxAjVW5eERempDWfaqRaaKgPdpRnstt1USpb2otO24cAePcHgX7IolWJiHF0aeb9l45jf10wx1ywHUGx500a1GKlHXl"
);

export default function FundraiserDetailsPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [fundraiser, setFundraiser] = useState({});
  const [donated, setDonated] = useState(false);

  function donate() {
    setDonated(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      let url = `/api/fundraisers/getOne/${id}`;
      const result = await axios.get(url);

      setFundraiser(result.data);
      setIsLoading(false);
    };
    fetchData();
  }, [donated]);

  return (
    <div style={{ minHeight: "60vh" }}>
      {isLoading ? (
        <div className="flex justify-center" style={{padding:"20%"}}>
          <CircularProgress />
        </div>
      ) : (
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
                <Typography
                  variant="h5"
                  color="text.secondary"
                  fontWeight="bold"
                >
                  Target: ${fundraiser.goalAmount.toLocaleString("en-US")}
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  fontWeight="bold"
                >
                  Funds raised: $
                  {fundraiser.currentAmount.toLocaleString("en-US")}
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  fontWeight="bold"
                >
                  Deadline:{" "}
                  {new Date(fundraiser.endDate).toLocaleDateString("en-GB")}
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
            <Elements stripe={stripePromise}>
              <MoneyDonationPage donate={donate} />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
}
