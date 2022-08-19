import { ACCESS_TOKEN_KEY } from "@/constants/keys";
import { API_URL } from "@/constants/urls";
import { CreateNote, Note, UpdateNote } from "@/models/note";
import axios from "axios";

export const getAllNotesAsync = async (): Promise<Note[]> => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const { data } = await axios.get(`${API_URL}/notes`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const getFavoritesNotesAsync = async (): Promise<Note[]> => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const { data } = await axios.get(`${API_URL}/notes`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const getNotesForNotebookAsync = async (
  notebookId: string
): Promise<Note[]> => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const { data } = await axios.get(`${API_URL}/notebooks/${notebookId}/notes`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const getNoteAsync = async (id: string): Promise<Note> => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const { data } = await axios.get(`${API_URL}/notes/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const createNoteAsync = async (body: CreateNote) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const { data } = await axios.post(`${API_URL}/notes`, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const updateNoteAsync = async ({
  id,
  body,
}: {
  id: string;
  body: UpdateNote;
}) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const { data } = await axios.patch(`${API_URL}/notes/${id}`, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};
