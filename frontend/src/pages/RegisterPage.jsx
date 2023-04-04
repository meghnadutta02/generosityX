import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { register, reset } from "../redux/authSlice";
const Register = () => {
  const [userData, setUserData] = useState({
    firstname: "",
    lastName:"",
    email: "",
    password: "",
    confirmPassword:"",
    phoneNumber: "",
  });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value })); //whenever set function depends on current state use this
  };
  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || user) navigate("/");
    dispatch(reset());
  }, [user, isError, message, isSuccess, dispatch, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await dispatch(register(userData));
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    height: "100vh",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "50%" }}>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="firstname">First name</InputLabel>
          <Input
            id="firstname"
            name="firstname"
            type="text"
            value={userData.name}
            onChange={handleChange}
            required
          />
          </FormControl>
          <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="lastName">Last name</InputLabel>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            value={userData.phoneNumber}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={userData.confirmPassword}
            onChange={handleChange}
            required
          />
        </FormControl>
        {error && <FormHelperText error>{error}</FormHelperText>}
       
        {isLoading ? <CircularProgress />: <Button variant="contained" type="submit" sx={{ marginTop: "1rem" }}>
          Register
        </Button>}
      </form>
    </Box>
  );
};

export default Register;
