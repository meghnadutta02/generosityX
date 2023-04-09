import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LoginPage from "../pages/LoginPage";
import { Alert } from "@mui/material";

const ProtectedRoutes = ({ admin }) => {
  const [isAuth, setIsAuth] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const { data } = await axios.get("/api/get-token");
        if (data.token) {
          setIsAuth(data.token);
          setIsAdmin(data.isAdmin);
        }
      } catch (err) {
        setIsAuth(null);
        setIsAdmin(false);
      }
    };
    fetchToken();
  }, []);

  return (
    isAuth &&
    (isAdmin && admin ? (
      <Outlet />
    ) : !isAdmin && !admin ? (
      <Outlet />
    ) : (
      <Alert severity="warning" sx={{height:"80vh", display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",fontSize:"1.5rem"}}>
        You are trying to access restricted routes.
      </Alert>
    ))
  );
};

export default ProtectedRoutes;
