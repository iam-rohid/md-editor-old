import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignInDto, SignUpDto, User } from "./user.types";
import { ACCESS_TOKEN_KEY } from "../../constants";
import { axiosClient } from "../../libs/axios";

export const signInWithEmailAsync = createAsyncThunk(
  "user/signInWithEmail",
  async (dto: SignInDto): Promise<User> => {
    const { data } = await axiosClient.post(`/auth/login`, dto);
    const { accessToken, user } = data;
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    return user;
  }
);

export const signUpWithEmailAsync = createAsyncThunk(
  "user/signUpWithEmail",
  async (dto: SignUpDto): Promise<User> => {
    const { data } = await axiosClient.post(`/auth/signup`, dto);
    const { accessToken, user } = data;
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    return user;
  }
);

export const getCurrentUserAsync = createAsyncThunk(
  "user/currentUser",
  async (): Promise<User> => {
    const { data } = await axiosClient.get(`/users/current`);
    return data;
  }
);

export const signOutAsync = createAsyncThunk("user/signOut", () => {
  localStorage.clear();
});
