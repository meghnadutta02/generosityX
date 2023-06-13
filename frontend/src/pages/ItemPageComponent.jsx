import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { CircularProgress } from "@mui/material";

export default function ItemPageComponent({ id }) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getItem = async () => {
      try {
        const { data } = await axios.get(`/api/donations/item/${id}`);
        console.log(data);
        if (data) {
          setItem(data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getItem();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="mt-4 flex justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="container">
          {item && (
            <>
              {item.images && item.images.length > 0 ? (
                <Carousel>
                  {item.images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100"
                        src={image}
                        alt={`Image ${index + 1}`}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <img
                  src={item.images[0]}
                  alt="Item Image"
                  style={{ width: "100%", height: "auto" }}
                />
              )}
              <strong>{item.category}</strong>
              <p>{item.description}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
