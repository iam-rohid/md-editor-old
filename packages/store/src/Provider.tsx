import React, { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";

type Props = {
  children: ReactNode;
};

export const Provider = (props: Props) => {
  return <ReduxProvider store={store}>{props.children}</ReduxProvider>;
};
