import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { NotesState } from "./notes.types";
import {
  createNote,
  deleteNote,
  getAllFavoriteNotes,
  getAllNotes,
  getAllPinnedNotes,
  updateNote,
} from "./notes.actions";

const initialState: NotesState = {
  status: "idle",
  data: [],
  favoriteNotes: [],
  pinnedNotes: [],
  error: null,
};

export const notesSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    changeFavorite: (
      state,
      action: PayloadAction<{ id: string; isFavorite: boolean }>
    ) => {
      if (
        action.payload.isFavorite &&
        !state.favoriteNotes.includes(action.payload.id)
      ) {
        state.favoriteNotes = [...state.favoriteNotes, action.payload.id];
        return;
      }

      if (
        !action.payload.isFavorite &&
        state.favoriteNotes.includes(action.payload.id)
      ) {
        state.favoriteNotes = state.favoriteNotes.filter(
          (f) => f !== action.payload.id
        );
      }
    },
    changePinned: (
      state,
      action: PayloadAction<{ id: string; isPinned: boolean }>
    ) => {
      if (
        action.payload.isPinned &&
        !state.pinnedNotes.includes(action.payload.id)
      ) {
        state.pinnedNotes = [...state.pinnedNotes, action.payload.id];
        return;
      }

      if (
        !action.payload.isPinned &&
        state.pinnedNotes.includes(action.payload.id)
      ) {
        state.pinnedNotes = state.pinnedNotes.filter(
          (f) => f !== action.payload.id
        );
      }
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
    builder.addCase(getAllFavoriteNotes.fulfilled, (state, action) => {
      state.favoriteNotes = action.payload;
    });
    builder.addCase(getAllPinnedNotes.fulfilled, (state, action) => {
      state.pinnedNotes = action.payload;
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
