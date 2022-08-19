import { createSlice } from "@reduxjs/toolkit";
import { MDEState } from "./mde.type";

const initialState: MDEState = {
  notes: [],
};

export const mdeSlice = createSlice({
  name: "mde",
  initialState,
  reducers: {},
});

export const mdeActions = mdeSlice.actions;
export const mdeReducer = mdeSlice.reducer;
