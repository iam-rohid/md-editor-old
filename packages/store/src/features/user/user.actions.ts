import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignInDto, SignUpDto, User } from "./user.types";
import axios from "axios";
import { ACCESS_TOKEN_KEY, API_URL } from "../../constants";

export const signInWithEmailAsync = createAsyncThunk(
  "user/signInWithEmail",
  async (
    dto: SignInDto,
    {}
  ): Promise<{
    accessToken: string;
    user: User;
  }> => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, dto, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
      return data;
    } catch (e: any) {
      throw Error(
        e?.response?.data?.message || "Something went wrong. Please try again"
      );
    }
  }
);

export const signUpWithEmailAsync = createAsyncThunk(
  "user/signUpWithEmail",
  async (
    dto: SignUpDto,
    {}
  ): Promise<{
    accessToken: string;
    user: User;
  }> => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/signup`, dto, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
      return data;
    } catch (e: any) {
      throw Error(
        e?.response?.data?.message || "Something went wrong. Please try again"
      );
    }
  }
);

export const getCurrentUserAsync = createAsyncThunk(
  "user/getCurrentUser",
  async (): Promise<User> => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    try {
      const { data } = await axios.get(`${API_URL}/users/current`, {
        params: {
          include: "profile",
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    } catch (e: any) {
      throw Error(
        e?.response?.data?.message || "Something went wrong. Please try again"
      );
    }
  }
);

export const logOutAsync = createAsyncThunk("user/logOut", () => {
  localStorage.clear();
});
