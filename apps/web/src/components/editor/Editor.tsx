import { getNoteAsync, updateNoteAsync } from "@/api/noteApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import Spinner from "../Spinner";
import EditorToolbar from "./EditorToolbar";

type Props = {
  noteId: string;
};

const Editor = (props: Props) => {
  const { noteId } = props;
  const queryClient = useQueryClient();
  const [body, setBody] = useState("");
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
            console.log("Saved");
            queryClient.setQueryData(["note", noteId], data);
          },
        }
      );
    },
    [updateMutation, noteId, queryClient]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (body !== data?.body) {
        handleBodyUpdate(body);
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [body, handleBodyUpdate, data]);

  if (status !== "success" || !data) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-full w-full flex-1 bg-white dark:bg-black">
      <EditorToolbar title={data.title} onTitleChange={handleTitleChange} />

      <textarea
        className="h-full w-full"
        value={body}
        onChange={(e) => setBody(e.currentTarget.value)}
      />
    </div>
  );
};

export default Editor;
