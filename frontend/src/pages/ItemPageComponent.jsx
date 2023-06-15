import axios from "axios";
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

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
        <div className="flex p-4 flex-col lg:flex-row">
          {item && (
            <>
              <div className="bg-white rounded-lg p-4 mb-auto md:mx-4 text-2xl">
                <strong>Item : {item.category}</strong>
                <p>Description : {item.description}</p>
              </div>
              {item.images && item.images.length > 0 ? (
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
                  {item.images.map((image, index) => (
                    <ImageListItem key={index}>
                      <img
                        className="d-block w-100"
                        src={image}
                        alt={`Image ${index + 1}`}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              ) : (
                <img
                  src={item.images[0]}
                  alt="Item Image"
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
