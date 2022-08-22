import Editor from "@/components/editor/Editor";
import NoteHeader from "@/components/NoteHeader";
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

  return (
    <div className="flex h-full w-full flex-1 flex-col overflow-hidden">
      <NoteHeader note={note} />
      {note.isDeleted && (
        <div className="truncate bg-red-500 px-4 py-1 text-white">
          This note has been deleted
        </div>
      )}
      <Editor note={note} />
    </div>
  );
};

export default Note;
