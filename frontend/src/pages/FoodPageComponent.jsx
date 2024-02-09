import axios from "axios";
import React, { useEffect, useState } from "react";
import { CircularProgress, Button } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useParams } from "react-router";

export default function FoodPageComponent(props) {
  const { id } = props;
  const { pid } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const dependancy = id ? id : pid;
  useEffect(() => {
    const getFood = async () => {
      try {
        let response;
        if (!id) {
          response = await axios.get(`/api/donations/food/${pid}`);
        } else {
          response = await axios.get(`/api/donations/food/${id}`);
        }
        const { data } = response;

        if (data) {
          setFood(data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getFood();
  }, [dependancy]);

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `/api/donations/delete/${id}?type=food`
      );
      if (data.successful) props.delete();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ minHeight: "70vh" }}>
      {loading ? (
        <div className="mt-4 flex justify-center" style={{ paddingTop: "10%" }}>
          <CircularProgress />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row" style={{ padding: "10%" }}>
          {food && (
            <>
              <div className="bg-white rounded-lg p-4 mb-auto md:mx-4 text-2xl">
                <strong>
                  Approximate number of people it can feed: {food.quantity}
                </strong>
                <p>Description: {food.description}</p>
                {id && (
                  <Button
                    variant="contained"
                    className="mt-3"
                    onClick={handleDelete}
                  >
                    Cancel
                  </Button>
                )}
              </div>
              {food.images && food.images.length > 0 ? (
                <ImageList
                  sx={{
                    width: 600,
                    height: 500,
                    "@media (max-width: 599px)": {
                      width: 240,
                    },
                    "@media (min-width: 600px)": {
                      width: 600,
                    },
                  }}
                  cols={2}
                  rowHeight={300}
                  className="sm:max-lg:mt-4"
                >
                  {food.images.map((image, index) => (
                    <ImageListItem key={index}>
                      <img
                        className="d-block w-100"
                        src={image.path}
                        alt={`Image ${index + 1}`}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              ) : (
                <img
                  src={food.images[0].path}
                  alt="Food Image"
                  style={{ width: "100%", height: "auto" }}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
