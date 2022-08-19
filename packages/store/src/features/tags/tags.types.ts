export interface Tag {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description?: string;
  color?: string;
}

export interface TagsState {
  status: "idle" | "loading" | "error" | "success";
  data: Tag[];
  error: any;
}
