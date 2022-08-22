import { useEffect, useRef, useState } from "react";
import {
  EditorView,
  keymap,
  placeholder,
  drawSelection,
  scrollPastEnd,
  rectangularSelection,
  lineNumbers,
} from "@codemirror/view";
import {
  indentWithTab,
  defaultKeymap,
  historyKeymap,
  history,
  emacsStyleKeymap,
} from "@codemirror/commands";
import { markdown } from "@codemirror/lang-markdown";
import { EditorState, Compartment, EditorSelection } from "@codemirror/state";
import { HighlightStyle, foldGutter, codeFolding } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { syntaxHighlighting } from "@codemirror/language";
import { closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete";
import { indentUnit } from "@codemirror/language";

const myHighlightStyle = HighlightStyle.define([
  {
    tag: tags.heading1,
    fontSize: "1.8rem",
    fontWeight: "800",
    lineHeight: "1.5",
  },
  {
    tag: tags.heading2,
    fontSize: "1.6rem",
    fontWeight: "700",
    lineHeight: "1.5",
  },
  {
    tag: tags.heading3,
    fontSize: "1.4rem",
    fontWeight: "600",
    lineHeight: "1.4",
  },
  {
    tag: tags.heading4,
    fontSize: "1.2rem",
    fontWeight: "500",
    lineHeight: "1.4",
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
export const themeComp = new Compartment();
export const updateListenerCamp = new Compartment();

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
      indentUnit.of("    "),
      history(),
      keymap.of([
        indentWithTab,
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...emacsStyleKeymap,
        ...historyKeymap,
      ]),
      drawSelection({
        drawRangeCursor: true,
      }),
      lineNumbers(),
      foldGutter({
        markerDOM(open) {
          const el = document.createElement("span");
          el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/></svg>`;
          el.classList.add("fold-button");
          el.classList.add(open ? "open" : "close");
          el.title = "Fold line";
          return el;
        },
      }),
      codeFolding({
        placeholderDOM(view, onclick) {
          const el = document.createElement("span");
          el.innerText = "...";
          el.title = "Unfold line";
          el.onclick = onclick;
          el.classList.add("unfold-button");
          return el;
        },
      }),
      rectangularSelection(),
      languageComp.of(markdown()),
      scrollPastEnd(),
      closeBrackets(),
      EditorState.allowMultipleSelections.of(true),
      EditorView.lineWrapping,
      themeComp.of([syntaxHighlighting(myHighlightStyle)]),
      placeholder("Start Typing..."),
      updateListenerCamp.of([]),
    ],
    doc,
    selection: EditorSelection.cursor(0),
  });
};
