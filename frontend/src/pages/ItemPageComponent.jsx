import axios from "axios";
import React, { useEffect, useState } from "react";
import { CircularProgress, Button } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useParams } from "react-router";
export default function ItemPageComponent(props) {
  const { id } = props;
  const { pid } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getItem = async () => {
      try {
        let response;
        if (!id) {
          response = await axios.get(
            `https://server.generosityx.app/api/donations/item/${pid}`
          );
        } else {
          response = await axios.get(
            `https://server.generosityx.app/api/donations/item/${id}`
          );
        }
        const { data } = response;

        if (data) {
          setItem(data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getItem();
  }, [id, pid]);
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `https://server.generosityx.app/api/donations/delete/${id}?type=item`
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
        <div
          className="flex p-4 flex-col lg:flex-row"
          style={{ padding: "10%" }}
        >
          {item && (
            <>
              <div className="bg-white rounded-lg p-4 mb-auto md:mx-4 text-2xl">
                <strong>Item : {item.category}</strong>
                <p>Description : {item.description}</p>
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
                        src={image.path}
                        alt={`Image ${index + 1}`}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              ) : (
                <img
                  src={item.images[0].path}
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
