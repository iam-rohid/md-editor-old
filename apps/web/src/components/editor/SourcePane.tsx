import useCodeMirror from "@/hooks/useCodeMirror";
import { useEffect } from "react";
import { EditorView } from "@codemirror/view";

type Props = {
  defaultValue?: string;
  onChange?: (value: string) => void;
  onEditorMount?: (editorView: EditorView) => void;
};

const SourcePane = (props: Props) => {
  const { onEditorMount } = props;
  const { editorRef, editorView } = useCodeMirror();

  useEffect(() => {
    if (!editorView) return;
    onEditorMount && onEditorMount(editorView);
  }, [editorView, onEditorMount]);

  return (
    <div
      className="relative h-full w-full flex-1 bg-white dark:bg-black"
      ref={editorRef}
    />
  );
};

export default SourcePane;
