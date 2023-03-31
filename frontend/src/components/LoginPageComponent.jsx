import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

const LoginPageComponent = ({ loginUserApiRequest, setReduxUserState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doNotLogout, setDoNotLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleDoNotLogoutChange = (event) => {
    setDoNotLogout(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    loginUserApiRequest(email, password, doNotLogout)
      .then((res) => {
        setIsLoading(false);

        if (res.userLoggedIn) {
          setReduxUserState(res.userLoggedIn);
        }

        if (res.success === "user logged in" && !res.userLoggedIn.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      })
      .catch((er) => {
        setIsLoading(false);
        setError(er.response.data.message || er.response.data);
      });
  };

  return (
    <Container maxWidth="xs" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>

      <Typography variant="h4" align="center" sx={{ mt: 5, mb: 2 }} >
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email address"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          required
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        <label>
          <input
            type="checkbox"
            checked={doNotLogout}
            onChange={handleDoNotLogoutChange}
          />
          <Typography variant="body1" sx={{ display: "inline" }}>{" "}
            Do not logout
          </Typography>
        </label>
        <Typography variant="body1" align="center" sx={{ mt: 2, mb: 2 }}>
          Don't you have an account?{" "}
          <Link to={"/register"}>Register</Link>
        </Typography>
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={isLoading}
          sx={{ mt: 2, mb: 2 }}
        >
          {isLoading && (
            <CircularProgress size={24} sx={{ mr: 1, color: "primary.main" }} />
          )}
          Login
        </Button>
        {error && (
          <Typography variant="body1" color="error" align="center">
            {error}
          </Typography>
        )}
      </form>
    </Container>
  );
};

export default LoginPageComponent;
