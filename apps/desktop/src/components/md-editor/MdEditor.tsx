import useCodeMirror from "@/hooks/useCodeMirror";
import "./md-editor.scss";

type Props = {
  initValue: string;
  onChange: (value: string) => void;
};

const MdEditor = (props: Props) => {
  const { initValue, onChange } = props;
  const { editorRef } = useCodeMirror({
    initValue,
    onChange,
  });

  return <div className="md-editor" ref={editorRef} />;
};

export default MdEditor;
