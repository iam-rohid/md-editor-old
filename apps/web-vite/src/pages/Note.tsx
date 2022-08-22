import MdEditor from "@/components/md-editor/MdEditor";
import MdPreview from "@/components/md-preview/MdPreview";
import NoteHeader from "@/components/NoteHeader";
import Spinner from "@/components/Spinner";
import { updateNote, useAppDispatch, useAppSelector } from "@mdotion/store";
import { useMatch } from "@tanstack/react-location";
import { useEffect, useCallback, useLayoutEffect, useState } from "react";
import removeMD from "remove-markdown";

const Note = () => {
  const match = useMatch();
  const {
    params: { noteId },
  } = match;
  const [prevNoteId, setPrevNoteId] = useState("");
  const note = useAppSelector((state) =>
    state.notes.data.find((note) => note.id === noteId)
  );
  const [doc, setDoc] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (noteId === prevNoteId) return;
    setDoc(null);
  }, [noteId, prevNoteId]);

  useEffect(() => {
    if (!note) return;
    if (prevNoteId === noteId) return;
    setPrevNoteId(noteId);
    setDoc(note.body);
  }, [noteId, prevNoteId, note]);

  const handleBodyUpdate = useCallback(
    (value: string) => {
      if (note && value !== note.body) {
        const matches = value
          .split(/\n/)
          .filter(Boolean)
          .slice(0, 2)
          .map((block) => removeMD(block));
        const title = matches[0];
        const description = matches[1];

        dispatch(
          updateNote({
            id: note.id,
            dto: {
              body: value,
              title: title?.slice(0, 100) || "",
              description: description?.slice(0, 200) || "",
            },
          })
        );
      }
    },
    [dispatch, note]
  );

  useEffect(() => {
    if (doc === null) return;
    const timeout = setTimeout(() => {
      handleBodyUpdate(doc);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [doc, handleBodyUpdate, note]);

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
      {doc !== null ? (
        <div className="flex h-full w-full flex-1 overflow-hidden">
          <MdEditor doc={doc} onDocChange={setDoc} />
          {/* <MdPreview doc={doc} /> */}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Note;
