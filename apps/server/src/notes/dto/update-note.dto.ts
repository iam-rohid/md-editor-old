export class UpdateNoteDto {
  title?: string;
  body?: string;
  description?: string;
  notebookId?: string | null;
  isFavorite?: boolean;
}
