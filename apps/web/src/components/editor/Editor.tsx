import { Note, updateNote, useAppDispatch } from "@mdotion/store";
import { EditorView } from "codemirror";
import { useCallback, useEffect, useState } from "react";
import EditorToolbar from "./EditorToolbar";
import useCodeMirror, {
  getEditorState,
  updateListener,
} from "@/hooks/useCodeMirror";

type Props = {
  note: Note;
};

const Editor = (props: Props) => {
  const { note } = props;
  const [noteId, setNoteId] = useState("");
  const [body, setBody] = useState("");
  const { editorRef, editorView } = useCodeMirror(note.body);
  const dispatch = useAppDispatch();

  const handleTitleChange = useCallback(
    (value: string) => {
      if (note.title === value) return;

      dispatch(
        updateNote({
          id: note.id,
          dto: {
            title: value,
          },
        })
      );
    },
    [dispatch, note]
  );

  const handleBodyUpdate = useCallback(
    (value: string) => {
      if (body !== note?.body) {
        console.log("Saved");
        dispatch(
          updateNote({
            id: note.id,
            dto: {
              body: value,
            },
          })
        );
      }
    },
    [body, dispatch, note?.body, note.id]
  );

  useEffect(() => {
    if (editorView && noteId !== note.id) {
      editorView.setState(getEditorState(note.body));
      editorView.dispatch({
        effects: updateListener.reconfigure(
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              setBody(String(update.state.doc));
            }
          })
        ),
      });
      setNoteId(note.id);
      setBody(note.body || "");
    }
  }, [note, noteId, editorView]);

  useEffect(() => {
    if (!body) return;
    const timeout = setTimeout(() => {
      handleBodyUpdate(body);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [body, handleBodyUpdate, note]);

  return (
    <div className="flex h-full w-full flex-1 flex-col overflow-hidden bg-white dark:bg-black">
      <EditorToolbar title={note.title} onTitleChange={handleTitleChange} />
      <div className="flex h-full w-full flex-1 overflow-hidden">
        <div
          className="relative h-full w-full flex-1 bg-white dark:bg-black"
          ref={editorRef}
        />
      </div>
    </div>
  );
};

export default Editor;
