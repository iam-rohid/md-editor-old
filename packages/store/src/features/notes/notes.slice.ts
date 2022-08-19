import { createSlice } from "@reduxjs/toolkit";
import type { NotesState } from "./notes.types";
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from "./notes.actions";

const initialState: NotesState = {
  status: "idle",
  data: [],
  error: null,
};

export const notesSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllNotes.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(getAllNotes.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      });
    builder
      .addCase(createNote.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.status = "success";
        state.data = [...state.data, action.payload];
      });
    builder
      .addCase(updateNote.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.status = "success";
        state.data = state.data.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      });
    builder
      .addCase(deleteNote.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.status = "success";
        state.data = state.data.filter((item) => item.id !== action.payload.id);
      });
  },
});

export const notesActions = notesSlice.actions;
export const notesReducer = notesSlice.reducer;
