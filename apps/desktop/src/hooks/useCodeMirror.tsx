import { useEffect, useRef, useState } from "react";
import { basicSetup } from "codemirror";
import { EditorView, keymap, placeholder } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { markdown } from "@codemirror/lang-markdown";
import { EditorState, Compartment } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";

export const languageComp = new Compartment();
export const tabSizeComp = new Compartment();
export const lineWrappingComp = new Compartment();
export const themeComp = new Compartment();

const useCodeMirror = ({
  initValue,
  onChange,
}: {
  initValue: string;
  onChange?: (vlaue: string) => void;
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorView, setEditorView] = useState<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;
    const state = EditorState.create({
      doc: initValue,
      extensions: [
        basicSetup,
        languageComp.of(markdown()),
        lineWrappingComp.of(EditorView.lineWrapping),
        tabSizeComp.of(EditorState.tabSize.of(8)),
        keymap.of([indentWithTab]),
        themeComp.of([oneDark]),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChange && onChange(String(update.state.doc));
          }
        }),

        placeholder("Start Typing..."),
      ],
    });
    const view = new EditorView({
      parent: editorRef.current,
      state,
    });
    setEditorView(view);
    return () => {
      view.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorRef, onChange]);

  return { editorRef, editorView };
};

export default useCodeMirror;
