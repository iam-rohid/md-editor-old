import useCodeMirror from "@/hooks/useCodeMirror";

type Props = {
  doc: string;
  onDocChange: (value: string) => void;
};

const MdEditor = (props: Props) => {
  const { doc, onDocChange } = props;
  const { editorRef } = useCodeMirror(doc, onDocChange);

  return <div className="flex-1" ref={editorRef} />;
};

export default MdEditor;
