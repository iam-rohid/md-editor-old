import { markdown } from "@codemirror/lang-markdown";
import React from "react";

type Props = {
  markdown: string;
};

const PreviewPane = (props: Props) => {
  const { markdown } = props;
  return <pre className="h-full w-full flex-1 overflow-y-auto">{markdown}</pre>;
};

export default PreviewPane;
