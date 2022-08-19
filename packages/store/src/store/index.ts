import { configureStore } from "@reduxjs/toolkit";
import {
  notesReducer,
  notebooksReducer,
  userReducer,
  mdeReducer,
  tagsReducer,
} from "../features";

export const store = configureStore({
  reducer: {
    notebooks: notebooksReducer,
    notes: notesReducer,
    tags: tagsReducer,
    user: userReducer,
    mde: mdeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
