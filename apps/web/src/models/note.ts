import { Notebook } from "./notebook";
import { User } from "./user";

export interface Note {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  body?: string;
  authorId: string;
  author?: User;
  parentId?: string;
  parent?: Notebook;
}

export type CreateNote = {
  title: string;
  body?: string;
  parentId?: string;
};

export type UpdateNote = {
  title?: string;
  body?: string;
  parentId?: string;
};
