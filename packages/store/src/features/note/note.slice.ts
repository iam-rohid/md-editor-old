import { createSlice } from "@reduxjs/toolkit";
import type { NoteState } from "./note.types";
import {
  createNoteAsync,
  getAllNotesAsync,
  updateNoteAsync,
} from "./ntoe.actions";

const initialState: NoteState = {
  status: "idle",
  data: [],
  error: null,
};

export const noteSlice = createSlice({
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

export const noteActions = noteSlice.actions;
export const noteReducer = noteSlice.reducer;
