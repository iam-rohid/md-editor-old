import { useEffect, useRef, useState } from "react";
import { basicSetup } from "codemirror";
import { EditorView, keymap, placeholder } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { markdown } from "@codemirror/lang-markdown";
import {
  EditorState,
  Compartment,
  EditorSelection,
  Text,
} from "@codemirror/state";
import { HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { syntaxHighlighting } from "@codemirror/language";

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
]);

export const languageComp = new Compartment();
export const tabSizeComp = new Compartment();
export const lineWrappingComp = new Compartment();
export const themeComp = new Compartment();
export const updateListener = new Compartment();

const useCodeMirror = (doc?: string) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorView, setEditorView] = useState<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;
    const state = getEditorState(doc);
    const view = new EditorView({
      state,
      parent: editorRef.current,
    });
    setEditorView(view);
    return () => {
      view.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorRef]);

  return { editorRef, editorView };
};

export default useCodeMirror;

export const getEditorState = (doc?: string): EditorState => {
  return EditorState.create({
    extensions: [
      basicSetup,
      languageComp.of(markdown()),
      lineWrappingComp.of(EditorView.lineWrapping),
      tabSizeComp.of(EditorState.tabSize.of(8)),
      keymap.of([indentWithTab]),
      themeComp.of([
        EditorView.baseTheme({}),
        syntaxHighlighting(myHighlightStyle),
      ]),
      placeholder("Start Typing..."),
      updateListener.of([]),
    ],
    doc,
    selection: EditorSelection.cursor(0),
  });
};
