import useCodeMirror, { themeComp } from "@/hooks/useCodeMirror";
import { useEffect } from "react";
import { EditorView } from "@codemirror/view";
import { HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { syntaxHighlighting } from "@codemirror/language";

const theme = EditorView.theme({}, { dark: true });

const myHighlightStyle = HighlightStyle.define([
  {
    tag: tags.heading1,
    fontSize: "1.8rem",
    fontWeight: "800",
    lineHeight: "1.8",
  },
  {
    tag: tags.heading2,
    fontSize: "1.6rem",
    fontWeight: "700",
    lineHeight: "1.7",
  },
  {
    tag: tags.heading3,
    fontSize: "1.4rem",
    fontWeight: "600",
    lineHeight: "1.6",
  },
  {
    tag: tags.heading4,
    fontSize: "1.2rem",
    fontWeight: "500",
    lineHeight: "1.6",
  },
  {
    tag: tags.strong,
    fontWeight: "800",
  },
  {
    tag: tags.link,
    color: "#FACC15",
  },
  {
    tag: tags.url,
    color: "#3B82F6",
    fontWeight: "600",
  },
  {
    tag: tags.meta,
    color: "#FACC15",
  },
  {
    tag: tags.variableName,
    colors: "red",
  },
]);

type Props = {
  defaultValue: string;
  onChange: (value: string) => void;
};

const SourcePane = (props: Props) => {
  const { defaultValue, onChange } = props;
  const { editorRef, editorView } = useCodeMirror({
    initValue: defaultValue,
    onChange,
  });

  useEffect(() => {
    if (!editorView) return;

    editorView.dispatch({
      effects: themeComp.reconfigure([
        theme,
        syntaxHighlighting(myHighlightStyle),
      ]),
    });
  }, [editorView]);

  return (
    <div
      className="relative h-full w-full flex-1 bg-white dark:bg-black"
      ref={editorRef}
    />
  );
};

export default SourcePane;
