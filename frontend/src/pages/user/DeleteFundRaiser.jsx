import axios from "axios";
import React, { useEffect, useState } from "react";
import { CircularProgress, Button, Alert } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useParams } from "react-router";
import { toast } from "react-toastify";

export default function ItemPageComponent() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletionSuccess, setDeletionSuccess] = useState(false);

  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await axios.get(
          `https://server.generosityx.app/api/fundraisers/getOne/${id}`
        );
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
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://server.generosityx.app/api/fundraisers/delete/${id}`
      );
      if (response.status === 401) toast.error("Unauthorized access!");
      if (response.data.successful) {
        setDeletionSuccess(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ minHeight: "80vh" }}>
      {loading ? (
        <div
          className="flex justify-center items-center"
          style={{ height: "100vh" }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div
          className="flex p-4 flex-col lg:flex-row"
          style={{ padding: "10%" }}
        >
          {item && (
            <>
              {deletionSuccess ? (
                <Alert
                  severity="info"
                  sx={{
                    width: "60%",

                    margin: "auto",
                    marginTop: "9%",
                    fontSize: "130%",
                  }}
                >
                  The fundraiser has been deleted.
                </Alert>
              ) : (
                <>
                  <div className="bg-white rounded-lg p-4 mb-auto md:mx-4 text-2xl">
                    <strong>Item : {item.title}</strong>
                    <p>Description : {item.description}</p>
                    <p className="mt-1 text-lg font-semibold text-gray-800">
                      Target: ${item.goalAmount.toLocaleString("en-US")}
                    </p>
                    <p className="mt-1 text-lg text-gray-800">
                      Deadline:{" "}
                      {item.endDate.replaceAll("-", "/").substring(5, 10)}
                    </p>
                    <Button
                      variant="contained"
                      className="mt-3"
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  </div>
                  {item.image && item.image.length > 0 ? (
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
                      {item.image.map((image, index) => (
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
                      src={item.image[0].path}
                      alt="Item Image"
                      style={{ width: "100%", height: "auto" }}
                    />
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
