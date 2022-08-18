import useCodeMirror, { themeComp } from "@/hooks/useCodeMirror";
import { useEffect } from "react";
import { EditorView } from "@codemirror/view";

const theme = EditorView.theme({}, { dark: true });

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
      effects: themeComp.reconfigure([theme]),
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
