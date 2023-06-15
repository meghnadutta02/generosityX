import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { CircularProgress, Button } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

export default function FoodPageComponent({ id }) {
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletionSuccess, setDeletionSuccess] = useState(false);

  useEffect(() => {
    const getFood = async () => {
      try {
        const { data } = await axios.get(`/api/donations/food/${id}`);
        console.log(data);
        if (data) {
          setFood(data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getFood();
  }, []);

  useEffect(() => {
    if (deletionSuccess) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [deletionSuccess]);

  const handleCancel = async () => {
    try {
      const response = await axios.put(`/api/donations/delete/${id}?type=food`);
      if (response.status === 201) setDeletionSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="mt-4 flex justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="container">
          {food && (
            <>
              {food.images && food.images.length > 0 ? (
                <Carousel>
                  {food.images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100"
                        src={image.path}
                        alt={`Image ${index + 1}`}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <img
                  src={food.images[0].path}
                  alt="Food Image"
                  style={{ width: "100%", height: "auto" }}
                />
              )}
              <strong>{food.event}</strong>
              <p>{food.description}</p>
              <Button variant="contained" onClick={handleCancel}>
                Cancel
              </Button>
              {deletionSuccess && (
                <div className="alert-container">
                  <MuiAlert
                    onClose={() => setDeletionSuccess(false)}
                    severity="success"
                    sx={{ width: "100%",marginTop:"3%"}}
                  >
                    Food donation deleted successfully! Refreshing page...
                  </MuiAlert>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
