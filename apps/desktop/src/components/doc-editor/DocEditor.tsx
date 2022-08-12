import useCodeMirror from "@/hooks/useCodeMirror";
import "./doc-editor.scss";

type Props = {
  initValue: string;
  onChange: (value: string) => void;
};

const DocEditor = (props: Props) => {
  const { initValue, onChange } = props;
  const { editorRef } = useCodeMirror({
    initValue,
    onChange,
  });

  return <div className="doc-editor" ref={editorRef} />;
};

export default DocEditor;
