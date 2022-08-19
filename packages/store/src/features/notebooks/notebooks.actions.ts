import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACCESS_TOKEN_KEY, API_URL } from "../../constants";
import { CreateNotebookDto, Notebook } from "./notebooks.types";

export const getNotebooksAsync = createAsyncThunk(
  "notebook/getAll",
  async (): Promise<Notebook[]> => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const { data } = await axios.get(`${API_URL}/notebooks`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  }
);

export const createNotebookAsync = createAsyncThunk(
  "notebook/create",
  async (dto: CreateNotebookDto): Promise<Notebook> => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const { data } = await axios.post(`${API_URL}/notebooks`, dto, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  }
);
