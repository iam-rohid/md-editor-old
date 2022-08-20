import { Note } from "../notes";

export interface Notebook {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description?: string;
  authorId: string;
  parentId?: string;
  parent?: Notebook;
  notes?: Note[];
}

export type CreateNotebookDto = {
  title: string;
  description?: string;
  parentId?: string;
};

export type UpdateNotebookDto = {
  title?: string;
  description?: string;
  parentId?: string;
};

export interface NotebooksState {
  status: "idle" | "loading" | "success" | "error";
  error: any;
  data: Notebook[];
}
