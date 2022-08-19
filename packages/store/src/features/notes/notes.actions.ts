import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CreateNoteDto, Note, UpdateNoteDto } from "./notes.types";
import { axiosClient } from "../../libs/axios";

export const getAllNotes = createAsyncThunk(
  "notes/all",
  async (): Promise<Note[]> => {
    const { data } = await axiosClient.get("/notes");
    return data;
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
  async (props: { id: string; dto: UpdateNoteDto }): Promise<Note> => {
    const { id, dto } = props;
    const { data } = await axiosClient.patch(`/notes/${id}`, dto);
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
