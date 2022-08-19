import { createSlice } from "@reduxjs/toolkit";
import type { UserState } from "./user.types";
import {
  getCurrentUserAsync,
  logOutAsync,
  signInWithEmailAsync,
  signUpWithEmailAsync,
} from "./user.actions";

const initialState: UserState = {
  status: "idle",
  data: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCurrentUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCurrentUserAsync.rejected, (state) => {
        state.status = "error";
      })
      .addCase(getCurrentUserAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      });
    builder
      .addCase(signInWithEmailAsync.pending, (state) => {
        state.status = "signingIn";
      })
      .addCase(signInWithEmailAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(signInWithEmailAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload.user;
      });
    builder
      .addCase(signUpWithEmailAsync.pending, (state) => {
        state.status = "signingUp";
      })
      .addCase(signUpWithEmailAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(signUpWithEmailAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload.user;
      });
    builder
      .addCase(logOutAsync.pending, (state) => {
        state.status = "signingOut";
      })
      .addCase(logOutAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(logOutAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data = null;
      });
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
