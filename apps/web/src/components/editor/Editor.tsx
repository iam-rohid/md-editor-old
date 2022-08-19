import {
  Note,
  updateNoteAsync,
  useAppDispatch,
  useAppSelector,
} from "@mdotion/store";
import { EditorView } from "codemirror";
import { useCallback, useEffect, useState } from "react";
import EditorToolbar from "./EditorToolbar";
import SourcePane from "./SourcePane";

type Props = {
  note: Note;
};

const Editor = (props: Props) => {
  const { note } = props;
  const [body, setBody] = useState("");
  const [editorView, setEditorView] = useState<EditorView | null>(null);
  const dispatch = useAppDispatch();

  const handleTitleChange = useCallback(
    (value: string) => {
      dispatch(
        updateNoteAsync({
          id: note.id,
          body: {
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
          updateNoteAsync({
            id: note.id,
            body: {
              body: value,
            },
          })
        );
      }
    },
    [body, dispatch, note?.body, note.id]
  );

  useEffect(() => {
    if (editorView) {
      editorView.dispatch({
        changes: {
          from: 0,
          to: editorView.state.doc.length,
          insert: note.body || "",
        },
      });
    }
    setBody(note.body || "");
  }, [note.body, editorView]);

  useEffect(() => {
    if (!body) return;

    const timeout = setTimeout(() => {
      handleBodyUpdate(body);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [body, handleBodyUpdate, note]);

  if (!note) {
    return null;
  }

  return (
    <div className="flex h-full w-full flex-1 flex-col overflow-hidden bg-white dark:bg-black">
      <EditorToolbar title={note.title} onTitleChange={handleTitleChange} />
      <div className="flex h-full w-full flex-1 overflow-hidden">
        <SourcePane
          onEditorMount={(editor) => {
            setEditorView(editor);
          }}
          defaultValue={body}
          onChange={setBody}
        />
      </div>
    </div>
  );
};

export default Editor;
