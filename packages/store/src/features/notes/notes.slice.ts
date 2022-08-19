import { createSlice } from "@reduxjs/toolkit";
import type { NotesState } from "./notes.types";
import {
  createNoteAsync,
  getAllNotesAsync,
  updateNoteAsync,
} from "./ntoes.actions";

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
      .addCase(getAllNotesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllNotesAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(getAllNotesAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      });
    builder
      .addCase(createNoteAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(createNoteAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data = [...state.data, action.payload];
      });
    builder
      .addCase(updateNoteAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(updateNoteAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data = state.data.map((note) => {
          if (note.id === action.payload.id) {
            return action.payload;
          }
          return note;
        });
      });
  },
});

export const notesActions = notesSlice.actions;
export const notesReducer = notesSlice.reducer;
