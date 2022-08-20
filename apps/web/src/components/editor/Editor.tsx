import { Note, updateNote, useAppDispatch } from "@mdotion/store";
import { EditorView } from "codemirror";
import { useCallback, useEffect, useState } from "react";
import EditorToolbar from "./EditorToolbar";
import useCodeMirror, {
  getEditorState,
  updateListenerCamp,
} from "@/hooks/useCodeMirror";
import removeMD from "remove-markdown";
type Props = {
  note: Note;
};

const Editor = (props: Props) => {
  const { note } = props;
  const [noteId, setNoteId] = useState("");
  const [body, setBody] = useState<string | null>(null);
  const { editorRef, editorView } = useCodeMirror(note.body);
  const dispatch = useAppDispatch();

  const handleBodyUpdate = useCallback(
    (value: string) => {
      if (value !== note?.body) {
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
    if (editorView && noteId !== note.id) {
      editorView.setState(getEditorState(note.body));
      editorView.dispatch({
        effects: updateListenerCamp.reconfigure(
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              setBody(String(update.state.doc));
            }
          })
        ),
      });
      editorView.scrollDOM.scrollTo({
        top: 0,
      });
      setNoteId(note.id);
      setBody(note.body || "");
    }
  }, [note, noteId, editorView]);

  useEffect(() => {
    if (body === null) return;
    const timeout = setTimeout(() => {
      handleBodyUpdate(body);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [body, handleBodyUpdate, note]);

  return (
    <div className="flex h-full w-full flex-1 flex-col overflow-hidden bg-white dark:bg-black">
      <EditorToolbar note={note} />
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
