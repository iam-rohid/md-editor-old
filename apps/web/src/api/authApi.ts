import { ACCESS_TOKEN_KEY } from "@/constants/keys";
import { User } from "@/models/user";
import axios from "axios";

const API_URL = "http://localhost:8080";

export const signInWithEmailPasswordAsync = async (body: {
  email: string;
  password: string;
}): Promise<{
  accessToken: string;
  user: User;
}> => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/login`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (e: any) {
    throw Error(
      e?.response?.data?.message || "Something went wrong. Please try again"
    );
  }
};

export const signUpWithEmailPasswordAsync = async (body: {
  fullname: string;
  email: string;
  password: string;
}): Promise<{
  accessToken: string;
  user: User;
}> => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/signup`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (e: any) {
    throw Error(
      e?.response?.data?.message || "Something went wrong. Please try again"
    );
  }
};

export const signOutAsync = async () => {
  throw Error("Not implemented");
};

export const getCurrentUserAsync = async (): Promise<User> => {
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
};
