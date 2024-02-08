import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  Card,
  CardHeader,
  Alert,
} from "@mui/material";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import Sidebar from "./Sidebar";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function OngoingCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let url = "https://generosityx-backend.onrender.com/api/campaigns/search";
      try {
        const result = await axios.get(url);
        setCampaigns(result.data);
        console.log(campaigns);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 20000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ minHeight: "80vh", paddingTop: "100px" }}>
      <Grid
        container
        sx={{
          "& > .MuiGrid-item": {
            marginBottom: "8%",
          },
        }}
      >
        {/* <Grid item xs={12}>
          <AdminNavbar />
        </Grid> */}
        <Grid item xs={12} md={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={9} style={{ marginLeft: "4%" }}>
          <div>
            {isLoading ? (
              <div
                className="flex justify-center"
                style={{ paddingTop: "15%" }}
              >
                <CircularProgress />
              </div>
            ) : (
              <div className="carousel-wrapper" style={{ padding: "0 1.7%" }}>
                {campaigns.length === 0 && (
                  <Alert severity="info" sx={{ fontSize: "larger" }}>
                    <strong>No active campaigns!</strong>
                  </Alert>
                )}
                <Carousel
                  infiniteLoop
                  useKeyboardArrows
                  showIndicators
                  swipeable
                  showArrows
                  showThumbs={false}
                  renderArrowPrev={(onClickHandler, hasPrev) =>
                    hasPrev && (
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: "40px",
                          height: "40px",
                          cursor: "pointer",
                          zIndex: 1,
                        }}
                        onClick={onClickHandler}
                      >
                        <span
                          style={{
                            color: "#808080",
                            fontSize: "210%",
                            fontWeight: "bold",
                            lineHeight: 0,
                          }}
                        >
                          {"<"}
                        </span>
                      </div>
                    )
                  }
                  renderArrowNext={(onClickHandler, hasNext) =>
                    hasNext && (
                      <div
                        style={{
                          position: "absolute",
                          right: "1%",
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: "40px",
                          height: "40px",
                          cursor: "pointer",
                          zIndex: 1,
                        }}
                        onClick={onClickHandler}
                      >
                        <span
                          style={{
                            color: "#808080",
                            fontSize: "212%",
                            fontWeight: "bold",
                            lineHeight: 0,
                          }}
                        >
                          {">"}
                        </span>
                      </div>
                    )
                  }
                  renderIndicator={(onClickHandler, isSelected) => (
                    <li
                      style={{
                        backgroundColor: isSelected ? "#20b2aa" : "#ccc",
                        width: "8px",
                        height: "8px",
                        display: "inline-block",
                        margin: "-8px 4px",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                      onClick={onClickHandler}
                    />
                  )}
                >
                  {campaigns.map((campaign) => (
                    <div key={campaign._id} style={{ margin: "0 4% 3% 4%" }}>
                      <Grid container>
                        <Grid item xs={12} md={6}>
                          <Grid item xs={12} md={9}>
                            <div className="carousel-cover-image">
                              <img
                                src={campaign.image.path}
                                alt="Campaign Cover"
                                style={{
                                  maxHeight: "300px",
                                  objectFit: "contain",
                                  width: "100%",
                                }}
                              />
                            </div>
                          </Grid>
                          <Grid item xs={12} md={3} style={{ marginTop: "4%" }}>
                            {campaign.attendees.length > 0 && (
                              <strong className="mt-3">
                                {campaign.attendees.length === 1
                                  ? "1 person has RSVPed"
                                  : `${campaign.attendees.length} people have RSVPed`}
                              </strong>
                            )}
                          </Grid>
                        </Grid>
                        <Grid item xs={12} md={6} paddingX="1.5%">
                          <Card>
                            <CardHeader
                              title={campaign.name}
                              style={{
                                backgroundColor: "#20b2aa",
                                color: "#fff",
                              }}
                            />
                            <div
                              style={{ textAlign: "left", padding: "2.5% 2%" }}
                            >
                              <Typography
                                variant="body1"
                                gutterBottom
                                style={{ padding: "4px" }}
                              >
                                {campaign.description}
                              </Typography>
                              <Typography
                                variant="body2"
                                gutterBottom
                                style={{ padding: "4px" }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span>
                                    Goal: $
                                    {Number(campaign.goal).toLocaleString(
                                      "en-US"
                                    )}
                                  </span>
                                  <span>
                                    From:{" "}
                                    {campaign.startDate
                                      .replaceAll("-", "/")
                                      .substring(5, 10)}
                                    <span className="ml-3">
                                      To:{" "}
                                      {campaign.endDate
                                        .replaceAll("-", "/")
                                        .substring(5, 10)}
                                    </span>
                                  </span>
                                </div>
                              </Typography>

                              <strong style={{ paddingLeft: "4px" }}>
                                {" "}
                                Organizer details:
                              </strong>

                              <Typography
                                variant="body2"
                                gutterBottom
                                style={{ padding: "4px" }}
                              >
                                Name: {campaign.organizer}
                              </Typography>
                              <Typography
                                variant="body2"
                                gutterBottom
                                style={{ padding: "4px" }}
                              >
                                Email: {campaign.contactEmail}
                              </Typography>
                              <Typography
                                variant="body2"
                                gutterBottom
                                style={{ padding: "4px" }}
                              >
                                Phone number: {campaign.contactPhone}
                              </Typography>

                              <strong style={{ paddingLeft: "4px" }}>
                                {" "}
                                Address:
                              </strong>

                              <Typography
                                variant="body2"
                                gutterBottom
                                style={{ padding: "4px" }}
                              >
                                Address: {campaign.address}
                              </Typography>
                              <Typography
                                variant="body2"
                                gutterBottom
                                style={{ padding: "4px" }}
                              >
                                City: {campaign.city}
                              </Typography>
                            </div>
                          </Card>
                        </Grid>
                      </Grid>
                    </div>
                  ))}
                </Carousel>
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default OngoingCampaigns;
