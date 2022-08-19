import { createSlice } from "@reduxjs/toolkit";
import type { NotebookState } from "./notebook.types";
import { createNotebookAsync, getNotebooksAsync } from "./notebook.actions";

const initialState: NotebookState = {
  status: "idle",
  data: [],
  error: null,
};

export const notebookSlice = createSlice({
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

export const notebookActions = notebookSlice.actions;
export const notebookReducer = notebookSlice.reducer;
