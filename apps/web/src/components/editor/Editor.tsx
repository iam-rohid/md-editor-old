import { getNoteAsync, updateNoteAsync } from "@/api/noteApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import Spinner from "../Spinner";
import EditorToolbar from "./EditorToolbar";
import SourcePane from "./SourcePane";

type Props = {
  noteId: string;
};

const Editor = (props: Props) => {
  const { noteId } = props;
  const queryClient = useQueryClient();
  const [body, setBody] = useState<string | null>(null);
  const { data, status } = useQuery(
    ["note", noteId],
    ({ queryKey }) => getNoteAsync(queryKey[1]),
    {
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setBody(data.body || "");
      },
    }
  );
  const updateMutation = useMutation(updateNoteAsync);

  const handleTitleChange = useCallback(
    (value: string) => {
      updateMutation.mutate(
        {
          id: noteId,
          body: {
            title: value,
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["note"]);
            queryClient.invalidateQueries(["notes"]);
          },
        }
      );
    },
    [updateMutation, noteId, queryClient]
  );

  const handleBodyUpdate = useCallback(
    (value: string) => {
      updateMutation.mutate(
        {
          id: noteId,
          body: {
            body: value,
          },
        },
        {
          onSuccess: (data) => {
            queryClient.setQueryData(["note", noteId], data);
          },
        }
      );
    },
    [updateMutation, noteId, queryClient]
  );

  useEffect(() => {
    if (!body) return;
    const timeout = setTimeout(() => {
      if (body !== data?.body) {
        handleBodyUpdate(body);
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [body, handleBodyUpdate, data]);

  useEffect(() => {
    setBody(null);
  }, [noteId]);

  if (status !== "success" || !data) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-1 flex-col overflow-hidden bg-white dark:bg-black">
      <EditorToolbar title={data.title} onTitleChange={handleTitleChange} />
      <div className="flex h-full w-full flex-1 overflow-hidden">
        {body !== null && <SourcePane defaultValue={body} onChange={setBody} />}
      </div>
    </div>
  );
};

export default Editor;
