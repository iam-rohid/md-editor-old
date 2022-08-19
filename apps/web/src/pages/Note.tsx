import Editor from "@/components/editor/Editor";
import { useAppSelector } from "@mdotion/store";
import { useMatch } from "@tanstack/react-location";

const Note = () => {
  const match = useMatch();
  const {
    params: { noteId },
  } = match;
  const note = useAppSelector((state) =>
    state.notes.data.find((note) => note.id === noteId)
  );

  if (!note) {
    return <p>Note not found</p>;
  }

  return <Editor note={note} />;
};

export default Note;
