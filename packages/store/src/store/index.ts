import { configureStore } from "@reduxjs/toolkit";
import {
  notesReducer,
  notebooksReducer,
  userReducer,
  mdeReducer,
} from "../features";

export const store = configureStore({
  reducer: {
    notebooks: notebooksReducer,
    notes: notesReducer,
    user: userReducer,
    mde: mdeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
