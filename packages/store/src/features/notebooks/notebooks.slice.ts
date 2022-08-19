import { createSlice } from "@reduxjs/toolkit";
import type { NotebooksState } from "./notebooks.types";
import { createNotebookAsync, getNotebooksAsync } from "./notebooks.actions";

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
      .addCase(getNotebooksAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNotebooksAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(getNotebooksAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      });
    builder
      .addCase(createNotebookAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(createNotebookAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data = [...state.data, action.payload];
      });
  },
});

export const notebooksActions = notebooksSlice.actions;
export const notebooksReducer = notebooksSlice.reducer;
