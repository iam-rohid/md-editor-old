import { ACCESS_TOKEN_KEY } from "@/constants/keys";
import { API_URL } from "@/constants/urls";
import { CreateNotebook, Notebook } from "@/models/notebook";
import axios from "axios";

export const createNotebookAsync = async (
  body: CreateNotebook
): Promise<Notebook> => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const { data } = await axios.post(`${API_URL}/notebooks`, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};
