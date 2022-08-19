import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  Notebook,
  CreateNotebookDto,
  UpdateNotebookDto,
} from "./notebooks.types";
import { axiosClient } from "../../libs/axios";

export const getNotebooks = createAsyncThunk(
  "notebooks/getAll",
  async (): Promise<Notebook[]> => {
    const { data } = await axiosClient.get("/notebooks");
    return data;
  }
);

export const createNotebook = createAsyncThunk(
  "notebooks/create",
  async (dto: CreateNotebookDto): Promise<Notebook> => {
    const { data } = await axiosClient.post("/notebooks", dto);

    return data;
  }
);

export const updateNotebook = createAsyncThunk(
  "notebooks/update",
  async (props: { id: string; dto: UpdateNotebookDto }): Promise<Notebook> => {
    const { id, dto } = props;
    const { data } = await axiosClient.patch(`/notebooks/${id}`, dto);
    return data;
  }
);

export const deleteNotebook = createAsyncThunk(
  "notebooks/delete",
  async (id: string): Promise<Notebook> => {
    const { data } = await axiosClient.delete(`/notebooks/${id}`);
    return data;
  }
);
