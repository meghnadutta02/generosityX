import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Grid,
  Modal,
  Typography,
  Box,
  Card,
  CardHeader,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Alert,
} from "@mui/material";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import Sidebar from "./Sidebar";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { toast } from "react-toastify";

function UnverifiedFundraisers() {
  const [selectedProofImage, setSelectedProofImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fundraisers, setFundraisers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isRejectSelected, setIsRejectSelected] = useState(false);
  const [reason, setReason] = useState("");
  const [selectedFundraiser, setSelectedFundraiser] = useState("");

  const handleReject = (id) => {
    setIsRejectSelected(true);
    setSelectedFundraiser(id);
  };
  const handleAccept = async (id) => {
    const promise = axios.put(`/api/fundraisers/admin/verify/${id}`);

    toast.promise(promise, {
      pending: "Accepting fundraiser...",
      success: `Fundraiser ${id} accepted`,
      error: "Error accepting fundraiser",
    });
    const result = await promise;
    if (result.status === 201) {
      setFundraisers((prevFundraisers) =>
        prevFundraisers.filter((fundraiser) => fundraiser._id !== id)
      );
    }
  };

  const handleReject1 = async (id) => {
    try {
      const promise = axios.post(`/api/fundraisers/admin/reject/${id}`, {
        reason: reason,
      });

      toast.promise(promise, {
        pending: "Rejecting fundraiser...",
        success: `Fundraiser ${id} rejected`,
        error: "Error rejecting fundraiser",
      });
      const response = await promise;

      if (response.status === 200) {
        setFundraisers((prevFundraisers) =>
          prevFundraisers.filter((fundraiser) => fundraiser._id !== id)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleRejectReasonChange = (event) => {
    setReason(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      let url = "/api/fundraisers/admin/unverified";
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
    }, 12000);

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
                {fundraisers.length === 0 && (
                  <Alert severity="info" sx={{ fontSize: "larger" }}>
                    <strong>
                      No fundraisers pending to be verified.Check Later!
                    </strong>
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
                                  maxHeight: "300px",
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
                                Target: $
                                {fundraiser.goalAmount.toLocaleString("en-US")}
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
                        <Grid item xs={12} md={12} style={{ marginTop: "2%" }}>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => {
                              handleAccept(fundraiser._id);
                            }}
                            style={{
                              marginRight: "2%",
                              display:
                                isRejectSelected &&
                                fundraiser._id === selectedFundraiser &&
                                "none",
                            }}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                              handleReject(fundraiser._id);
                            }}
                            style={{
                              display:
                                isRejectSelected &&
                                fundraiser._id === selectedFundraiser &&
                                "none",
                            }}
                          >
                            Reject
                          </Button>
                          {isRejectSelected &&
                            fundraiser._id === selectedFundraiser && (
                              <Grid container>
                                <Grid item xs={6} md={6}>
                                  <RadioGroup
                                    name="rejectReason"
                                    value={reason}
                                    onChange={handleRejectReasonChange}
                                    style={{ marginTop: "1rem" }}
                                  >
                                    <FormControlLabel
                                      value="The fundraiser may lack proper and sufficient proof to support its claims or legitimacy. The proof images provided are unclear, incomplete, or do not adequately substantiate the cause or need for fundraising."
                                      control={<Radio />}
                                      label="Insufficient or Inadequate Proof"
                                    />
                                    <FormControlLabel
                                      value=" The fundraiser may involve misrepresentation or fraudulent activities. The proof images provided raise suspicions or doubts about the authenticity or accuracy of the fundraiser's claims, purpose, or intended use of funds.
"
                                      control={<Radio />}
                                      label="Misrepresentation or Fraud"
                                    />
                                    <FormControlLabel
                                      value="The fundraiser does not comply with relevant legal requirements, such as licensing, permits, or regulations. The proof images indicate that the fundraiser may be engaging in activities that are illegal or not authorized by the appropriate authorities."
                                      control={<Radio />}
                                      label="Non-Compliance with Legal Requirements"
                                    />
                                  </RadioGroup>
                                </Grid>
                                <Grid item xs={6} md={6}>
                                  <RadioGroup
                                    name="rejectReason"
                                    value={reason}
                                    onChange={handleRejectReasonChange}
                                    style={{ marginTop: "1rem" }}
                                  >
                                    <FormControlLabel
                                      value=" The fundraiser duplicates or overlaps with existing fundraisers or campaigns on the platform. The proof images show similarities or indicate that the fundraiser does not offer a unique or distinct value proposition compared to other ongoing campaigns."
                                      control={<Radio />}
                                      label="Duplication or Overlapping"
                                    />
                                    <FormControlLabel
                                      value="The proof images submitted by the fundraiser contain inappropriate or illegal content. This includes images promoting violence, hate speech, discrimination, or any activities that contravene local laws or regulations."
                                      control={<Radio />}
                                      label="Inappropriate Content or Illegal Activities"
                                    />
                                    <FormControlLabel
                                      value="The fundraiser's description, details, or proof images contain incomplete or inconsistent information. There are missing or contradictory elements that make it difficult to assess the fundraiser's credibility or understand its purpose and intended impact.

"
                                      control={<Radio />}
                                      label="Incomplete or Inconsistent Information"
                                    />
                                  </RadioGroup>
                                </Grid>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => {
                                    setIsRejectSelected(false);
                                  }}
                                  style={{ marginTop: "1%", marginRight: "2%" }}
                                >
                                  Go Back
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={() => {
                                    handleReject1(fundraiser._id);
                                  }}
                                  style={{ marginTop: "1%" }}
                                >
                                  Reject
                                </Button>
                              </Grid>
                            )}
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
                  maxWidth: "70%",
                  maxHeight: "70%",
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

export default UnverifiedFundraisers;
