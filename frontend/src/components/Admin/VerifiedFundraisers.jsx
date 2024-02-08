import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Grid,
  Modal,
  Typography,
  Box,
  Card,
  CardHeader,
  Alert,
} from "@mui/material";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import Sidebar from "./Sidebar";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function VerifiedFundraisers() {
  const [selectedProofImage, setSelectedProofImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fundraisers, setFundraisers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let url = "https://generosityx-backend.onrender.com/api/fundraisers";
      try {
        const result = await axios.get(url);
        setFundraisers(result.data.fundraisers);
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

  const handleProofImageClick = (image) => {
    setSelectedProofImage(image);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedProofImage(null);
    setIsModalOpen(false);
  };

  return (
    <div style={{ minHeight: "75vh", paddingTop: "100px" }}>
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
                {fundraisers.length === 0 && (
                  <Alert severity="info" sx={{ fontSize: "larger" }}>
                    <strong>No active fundraisers!</strong>
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
                  {fundraisers.map((fundraiser) => (
                    <div key={fundraiser._id} style={{ margin: "0 4% 3% 4%" }}>
                      <Grid container>
                        <Grid item xs={12} md={7}>
                          <Grid item xs={12} md={8}>
                            <div className="carousel-cover-image">
                              <img
                                src={fundraiser.image[0].path}
                                alt="Fundraiser Cover"
                                style={{
                                  maxHeight: "270px",
                                  objectFit: "contain",
                                  width: "100%",
                                }}
                              />
                            </div>
                          </Grid>
                          <Grid item xs={12} md={4} style={{ marginTop: "4%" }}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              style={{ textAlign: "left" }}
                            >
                              Proof Images
                            </Typography>
                            <div className="flex justify-content">
                              {fundraiser.image.slice(1).map((image, index) => (
                                <img
                                  onClick={() => {
                                    handleProofImageClick(image.path);
                                  }}
                                  key={index}
                                  src={image.path}
                                  alt={`Proof Image ${index + 1}`}
                                  style={{
                                    height: "100px",
                                    objectFit: "contain",
                                    cursor: "pointer",
                                    marginRight: "10px",
                                    pointerEvents: "auto",
                                  }}
                                />
                              ))}
                            </div>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} md={5} paddingX="1.5%">
                          <Card>
                            <CardHeader
                              title={fundraiser.title}
                              style={{
                                backgroundColor: "#20b2aa",
                                color: "#fff",
                              }}
                            />
                            <div
                              style={{ textAlign: "left", padding: "5% 2%" }}
                            >
                              <Typography
                                variant="body1"
                                gutterBottom
                                style={{ padding: "5px" }}
                              >
                                {fundraiser.description}
                              </Typography>
                              <Typography
                                variant="body2"
                                gutterBottom
                                style={{ padding: "5px" }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span>
                                    Target: $
                                    {fundraiser.goalAmount.toLocaleString(
                                      "en-US"
                                    )}
                                  </span>
                                  <span>
                                    {" "}
                                    Funds raised: $
                                    {fundraiser.currentAmount.toLocaleString(
                                      "en-US"
                                    )}
                                  </span>
                                </div>
                              </Typography>

                              <Typography
                                variant="body2"
                                gutterBottom
                                style={{ padding: "5px" }}
                              >
                                Deadline:{" "}
                                {new Date(
                                  fundraiser.endDate
                                ).toLocaleDateString("en-GB")}
                              </Typography>
                              <Typography
                                variant="body2"
                                gutterBottom
                                style={{ padding: "5px" }}
                              >
                                <strong> Creator details:</strong>
                              </Typography>
                              <Typography
                                variant="body2"
                                gutterBottom
                                style={{ padding: "5px" }}
                              >
                                Name: {fundraiser.creator.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                gutterBottom
                                style={{ padding: "5px" }}
                              >
                                Email: {fundraiser.creator.email}
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
            <Modal
              open={isModalOpen}
              onClose={handleModalClose}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  outline: 0,
                  width: "auto",
                  height: "auto",
                }}
              >
                <img
                  src={selectedProofImage}
                  alt="Proof Image"
                  style={{
                    width: "100%",
                    height: "100%",
                    maxHeight: "80vh",
                    maxWidth: "80vw",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Modal>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default VerifiedFundraisers;
