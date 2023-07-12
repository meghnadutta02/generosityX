import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
} from "@mui/material";
import AdminNavbar from "./AdminNavbar";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";

function UserPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let url;
      if (search) url = `/api/users?search=${search}`;
      else url = "/api/users";
      try {
        const result = await axios.get(url);
        setUsers(result.data.users);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [search]);

  const makeAdmin = async (user) => {
    const { data } = await axios.put(`/api/users/${user._id}`);
    if (data && data.successful) toast.success(`${user.email} is now an admin`);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div style={{ minHeight: "80vh" }}>
      <Grid
        container
        sx={{
          "& > .MuiGrid-item": {
            marginBottom: "8%",
          },
        }}
      >
        <Grid item xs={12}>
          <AdminNavbar />
        </Grid>
        <Grid item xs={12} md={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={9} style={{ marginLeft: "4%" }}>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <>
              <TextField
                value={search}
                onChange={handleSearch}
                style={{ marginBottom: "16px" }}
                label="Search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <TableContainer
                sx={{
                  boxShadow: "0px 3px 4px rgba(0, 0, 0, 0.4)",
                  borderRadius: "5px",
                }}
              >
                <Table>
                  <TableHead
                    sx={{
                      backgroundColor: "#50a6a0",
                    }}
                  >
                    <TableRow>
                      <TableCell>
                        <Typography variant="h6">Email</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Name</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Admin</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Actions</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{`${user.firstname} ${user.lastName}`}</TableCell>
                        <TableCell>{user.isAdmin ? "Yes" : "No"}</TableCell>
                        <TableCell>
                          {!user.isAdmin && (
                            <Button
                              variant="outlined"
                              onClick={() => makeAdmin(user)}
                            >
                              Make Admin
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default UserPage;
