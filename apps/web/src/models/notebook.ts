import { Note } from "./note";
import { User } from "./user";

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

export type CreateNotebook = {
  title: string;
  description?: string;
  parentId?: string;
};

export type UpdateNotebook = {
  title?: string;
  description?: string;
  parentId?: string;
};
