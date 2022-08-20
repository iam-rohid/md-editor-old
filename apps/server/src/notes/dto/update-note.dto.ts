export class UpdateNoteDto {
  title?: string;
  body?: string;
  description?: string;
  notebookId?: string | null;
  isDeleted?: boolean;
  isFavorite?: boolean;
  isPinned?: boolean;
}
