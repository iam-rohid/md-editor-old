import { configureStore } from "@reduxjs/toolkit";
import {
  noteReducer,
  notebookReducer,
  userReducer,
  mdeReducer,
} from "../features";

export const store = configureStore({
  reducer: {
    notebook: notebookReducer,
    note: noteReducer,
    user: userReducer,
    mde: mdeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
