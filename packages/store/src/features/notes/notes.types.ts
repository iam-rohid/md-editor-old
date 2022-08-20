import { Notebook } from "../notebooks";

export interface Note {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  body?: string;
  description?: string;
  authorId: string;
  notebookId?: string;
  notebook?: Notebook;
  isDeleted?: boolean;
}

export interface NotesState {
  status: "idle" | "loading" | "error" | "success";
  data: Note[];
  favoriteNotes: string[];
  pinnedNotes: string[];
  error: any;
}

export type CreateNoteDto = {
  title: string;
  body?: string;
  notebookId?: string;
  description?: string;
};

export type UpdateNoteDto = {
  title?: string;
  body?: string;
  notebookId?: string;
  description?: string;
  isFavorite?: boolean;
  isDeleted?: boolean;
  isPinned?: boolean;
};
