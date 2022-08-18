import Editor from "@/components/editor/Editor";
import { useMatch } from "@tanstack/react-location";

const Note = () => {
  const match = useMatch();
  const {
    params: { noteId },
  } = match;
  return <Editor noteId={noteId} />;
};

export default Note;
