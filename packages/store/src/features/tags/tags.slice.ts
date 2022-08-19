import { createSlice } from "@reduxjs/toolkit";
import type { TagsState } from "./tags.types";
import { createTag, deleteTag, getAllTags, updateTag } from "./tags.actions";

const initialState: TagsState = {
  status: "idle",
  data: [],
  error: null,
};

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getAllTags.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllTags.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(getAllTags.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      });
    builder
      .addCase(createTag.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.status = "success";
        state.data = [...state.data, action.payload];
      });
    builder
      .addCase(updateTag.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(updateTag.fulfilled, (state, action) => {
        state.status = "success";
        state.data = state.data.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      });
    builder
      .addCase(deleteTag.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.status = "success";
        state.data = state.data.filter((item) => item.id !== action.payload.id);
      });
  },
});

export const tagsActions = tagsSlice.actions;
export const tagsReducer = tagsSlice.reducer;
