import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5002/api/auth/register",
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const response = await axios.post(
    "http://localhost:5002/api/auth/login",
    formData,
    {
      withCredentials: true,
    }
  );
  return response.data;
});
export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.post(
    "http://localhost:5002/api/auth/logout",
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
});

export const checkAuth = createAsyncThunk("/auth/checkAuth", async (token) => {
  const response = await axios.get(
    "http://localhost:5002/api/auth/check-auth",

    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control":
          "no-store, no-cache , must-revalidate , proxy-revalidate",
      },
    }
  );
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
    resetTokenAndCredentials: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action);

        state.isLoading = false;
        state.isAuthenticated = action.payload.success ? true : false;
        state.user = action.payload.success ? action.payload.user : null;
        state.token = action.payload.token;
        sessionStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action);

        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        console.log(action);

        state.isLoading = false;
        state.isAuthenticated = action.payload.success ? true : false;
        state.user = action.payload.success ? action.payload.user : null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        console.log(action);

        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { setUser, resetTokenAndCredentials } = authSlice.actions;

export default authSlice.reducer;
