import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CreateTagDto, Tag, UpdateTagDto } from "./tags.types";
import { axiosClient } from "../../libs/axios";

export const getAllTags = createAsyncThunk(
  "tags/all",
  async (): Promise<Tag[]> => {
    const { data } = await axiosClient.get(`/tags`);
    return data;
  }
);

export const createTag = createAsyncThunk(
  "tags/create",
  async (dto: CreateTagDto): Promise<Tag> => {
    const { data } = await axiosClient.post(`/tags`, dto);
    return data;
  }
);

export const updateTag = createAsyncThunk(
  "tags/update",
  async (props: { id: string; dto: UpdateTagDto }): Promise<Tag> => {
    const { id, dto } = props;
    const { data } = await axiosClient.patch(`/tags/${id}`, dto);
    return data;
  }
);

export const deleteTag = createAsyncThunk(
  "tags/delete",
  async (id: string): Promise<Tag> => {
    const { data } = await axiosClient.delete(`/tags/${id}`);
    return data;
  }
);
