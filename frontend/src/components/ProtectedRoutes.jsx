import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, CircularProgress } from "@mui/material";

const ProtectedRoutes = ({ admin }) => {
  const [isAuth, setIsAuth] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const { data } = await axios.get("/api/get-token");
        if (data.token) {
          setIsAuth(true);
          setIsAdmin(data.isAdmin);
        } else {
          setIsAuth(false);
          setIsAdmin(false);
        }
      } catch (err) {
        setIsAuth(false);
        setIsAdmin(false);
      }
    };
    fetchToken();
  }, []);

  if (isAuth === null) {
    return <div className="flex justify-center"><CircularProgress/></div>; 
  }

  if (!isAuth || (admin && !isAdmin)) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
