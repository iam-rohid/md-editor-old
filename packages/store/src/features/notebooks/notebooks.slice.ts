import { createSlice } from "@reduxjs/toolkit";
import type { NotebooksState } from "./notebooks.types";
import {
  createNotebook,
  deleteNotebook,
  getNotebooks,
  updateNotebook,
} from "./notebooks.actions";

const initialState: NotebooksState = {
  status: "idle",
  data: [],
  error: null,
};

export const notebooksSlice = createSlice({
  name: "notebook",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getNotebooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNotebooks.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(getNotebooks.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      });
    builder
      .addCase(createNotebook.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(createNotebook.fulfilled, (state, action) => {
        state.status = "success";
        state.data = [...state.data, action.payload];
      });
    builder
      .addCase(updateNotebook.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(updateNotebook.fulfilled, (state, action) => {
        state.status = "success";
        state.data = state.data.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      });
    builder
      .addCase(deleteNotebook.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(deleteNotebook.fulfilled, (state, action) => {
        state.status = "success";
        state.data = state.data.filter((item) => item.id !== action.payload.id);
      });
  },
});

export const notebooksActions = notebooksSlice.actions;
export const notebooksReducer = notebooksSlice.reducer;
