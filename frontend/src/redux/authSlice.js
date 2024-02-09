import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//get user from localStorage
const user =
  JSON.parse(localStorage.getItem("user")) ||
  JSON.parse(sessionStorage.getItem("user"));
const initialState = {
  user: user ? user : null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
//Register User

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(
        "https://server.generosityx.app/api/users/register",
        userData
      );

      if (res.data) {
        sessionStorage.setItem("user", JSON.stringify(res.data));
      }
      return res.data;
    } catch (err) {
      var msg;
      if (err.response.status === 400) msg = err.response.data.error;
      else
        msg =
          (err.response && err.response.data && err.response.data.error) ||
          err.message ||
          err.toString();
      return thunkAPI.rejectWithValue(msg);
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async () => {
  await axios.get("https://server.generosityx.app/api/logout");

  const localUser = localStorage.getItem("user");
  const sessionUser = sessionStorage.getItem("user");
  if (localUser) localStorage.removeItem("user");
  else if (sessionUser) sessionStorage.removeItem("user");

  return null;
});
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const response = await axios.post(
      "https://server.generosityx.app/api/users/login",
      user
    );
    if (response.status === 200) {
      if (user.doNotLogout) {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        date.setSeconds(date.getSeconds() - 7);
        const userData = {
          ...response.data,
          expDate: date.getTime(),
        };
        localStorage.setItem("user", JSON.stringify(userData));
      } else sessionStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    }
  } catch (err) {
    var msg;
    if (err.response.status === 401 || err.response.status === 400)
      msg = err.response.data.error;
    else
      msg =
        (err.response && err.response.data && err.response.data.error) ||
        err.message ||
        err.toString();
    return thunkAPI.rejectWithValue(msg);
  }
});
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      (state.isLoading = false),
        (state.isError = false),
        (state.isSuccess = false),
        (state.message = "");
    },
  },
  extraReducers: (builder) => {
    //to handle createAsyncThunk
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload; //err message
        state.user = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload; //err message
        state.user = null;
      });
  },
});
export const { reset } = authSlice.actions;
export const authReducer = authSlice.reducer;
