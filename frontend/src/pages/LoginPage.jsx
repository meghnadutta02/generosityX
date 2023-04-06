import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
  Paper,
} from "@mui/material";
import { login, reset } from "../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";

const LoginPageComponent = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    doNotLogout: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(login(formData));
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (isError) setError(message);
    if (isSuccess || user) navigate("/");
    dispatch(reset());
  }, [user, isError, message, isSuccess, dispatch, navigate]);

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
  height: "100vh",
    }}>
    <Container maxWidth="xs">
      <Paper sx={{ p: 2, mt: 5 }}>
        <Typography variant="h4" align="center" sx={{ mb: 2 }}>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            id="email"
            label="Email address"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            type="password"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.doNotLogout}
                onChange={handleChange}
                name="doNotLogout"
                color="primary"
              />
            }
            label="Do not logout"
          />
          <Typography variant="body1" align="center" sx={{ mt: 2, mb: 2 }}>
            Don't have an account?{" "}
            <Link to={"/register"} ><strong>Register</strong></Link>
          </Typography>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            {isLoading && (
              <CircularProgress size={24} sx={{ mr: 1, color: "primary.main" }} />
            )}
            Login
          </Button>
          {error && (
            <Typography variant="body1" color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
    </Box>
  );
};

export default LoginPageComponent;
