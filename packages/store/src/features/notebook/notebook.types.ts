import type { Note } from "../note";
import type { User } from "../user";

export interface Notebook {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description?: string;
  authorId: string;
  author?: User;
  parentId?: string;
  parent?: Notebook;
  notebooks?: Notebook[];
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

export interface NotebookState {
  status: "idle" | "loading" | "success" | "error";
  error: any;
  data: Notebook[];
  // favorites: string[];
  // tree: {
  //   notebook: string;
  //   notebooks: string[];
  //   notes: string[];
  //   isExpanded: boolean;
  // }[];
}
