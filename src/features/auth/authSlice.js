import { createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  getLoggedInUser,
  loginUser,
  logoutUser,
} from "./authApiSlice.js";

// create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    message: null,
    error: null,
  },
  reducers: {
    setMessageEmpty: (state, action) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.message = action.payload.message;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.message = action.payload.message;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.user = null;
      state.message = action.payload.message;
      localStorage.removeItem("user");
    
    });

    // get logged in user
    builder.addCase(getLoggedInUser.rejected, (state, action) => {
      state.error = action.error.message;
      state.user = null;
    });
    builder.addCase(getLoggedInUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.message = action.payload.message;
    });
  },
});
// export selector
export const getAuthData = (state) => state.auth;
// export actions
export const { setMessageEmpty } = authSlice.actions;

// export
export default authSlice.reducer;
