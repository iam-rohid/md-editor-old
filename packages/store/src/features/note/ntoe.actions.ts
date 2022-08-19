import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateNoteDto, Note, UpdateNoteDto } from "./note.types";
import axios from "axios";
import { ACCESS_TOKEN_KEY, API_URL } from "../../constants";

export const getAllNotesAsync = createAsyncThunk(
  "note/getAll",
  async (): Promise<Note[]> => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const { data } = await axios.get(`${API_URL}/notes`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  }
);

export const createNoteAsync = createAsyncThunk(
  "note/create",
  async (body: CreateNoteDto): Promise<Note> => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const { data } = await axios.post(`${API_URL}/notes`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  }
);

export const updateNoteAsync = createAsyncThunk(
  "note/update",
  async ({ id, body }: { id: string; body: UpdateNoteDto }): Promise<Note> => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const { data } = await axios.patch(`${API_URL}/notes/${id}`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  }
);
