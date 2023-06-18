import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router";
import { Favorite } from "@mui/icons-material";
import "../App.css";

const ThankYouPage = () => {
  const [dataFetched, setDataFetched] = useState(false);
  const navigate=useNavigate();
  const { cid, email } = useParams();
  const data = {
    campaignId: cid,
    email: email,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/rsvp", data);
        if (response.status === 201) {
          setDataFetched(true);
        }
        else if(response.status==200)
        {
          navigate("/");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
       
      }}
      className="donate-bg"
    >
      {dataFetched && (
        <div style={{ textAlign: "center", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", borderRadius: "10px",
        padding: "3%"}}>
          <h1 style={{ fontSize: "200%" }}>
            <Favorite sx={{ color: "red",fontSize:"inherit"}} />{" "}
            <strong>Thank You!</strong>
          </h1>
          <p style={{ fontSize: "150%" }}>
            We appreciate your participation.
          </p>
        </div>
      )}
    </div>
  );
};

export default ThankYouPage;
