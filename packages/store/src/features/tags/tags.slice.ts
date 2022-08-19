import { createSlice } from "@reduxjs/toolkit";
import { TagsState } from "./tags.types";

const initialState: TagsState = {
  status: "idle",
  data: [],
  error: null,
};

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
});

export const tagsActions = tagsSlice.actions;
export const tagsReducer = tagsSlice.reducer;
