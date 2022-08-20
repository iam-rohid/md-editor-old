import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CreateNoteDto, Note, UpdateNoteDto } from "./notes.types";
import { axiosClient } from "../../libs/axios";
import { notesActions } from "./notes.slice";

export const getAllNotes = createAsyncThunk(
  "notes/all",
  async (_, { dispatch }): Promise<Note[]> => {
    const { data } = await axiosClient.get("/notes");
    dispatch(getAllFavoriteNotes());
    return data;
  }
);

export const getAllFavoriteNotes = createAsyncThunk(
  "notes/favorites",
  async (): Promise<string[]> => {
    const { data } = await axiosClient.get("/notes/favorites");
    return data.map((note: Note) => note.id);
  }
);

export const createNote = createAsyncThunk(
  "notes/create",
  async (dto: CreateNoteDto): Promise<Note> => {
    const { data } = await axiosClient.post("/notes", dto);
    return data;
  }
);

export const updateNote = createAsyncThunk(
  "notes/update",
  async (
    props: { id: string; dto: UpdateNoteDto },
    { dispatch }
  ): Promise<Note> => {
    const { id, dto } = props;
    const { data } = await axiosClient.patch(`/notes/${id}`, dto);
    if (dto.isFavorite !== undefined) {
      dispatch(
        notesActions.changeFavorite({
          id,
          isFavorite: dto.isFavorite,
        })
      );
    }
    return data;
  }
);

export const deleteNote = createAsyncThunk(
  "notes/delete",
  async (id: string): Promise<Note> => {
    const { data } = await axiosClient.delete(`/notes/${id}`);
    return data;
  }
);
