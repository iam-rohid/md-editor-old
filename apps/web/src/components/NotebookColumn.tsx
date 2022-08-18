import { createNoteAsync, getNotesAsync } from "@/api/noteApi";
import { Link, useMatch, useNavigate } from "@tanstack/react-location";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useCallback } from "react";
import { MdAdd } from "react-icons/md";
import NoteItem from "./NoteItem";
import SidebarItemGroup from "./SidebarItemGroup";
import Spinner from "./Spinner";

const NotebookColumn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const match = useMatch();
  const notes = useQuery(
    ["notes", match.params["notebookId"]],
    ({ queryKey }) => getNotesAsync(queryKey[1])
  );

  const createNoteMutation = useMutation(createNoteAsync, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["notes"]);
      navigate({
        to: `notes/${data.id}`,
      });
    },
  });

  const handleCreateNewNote = useCallback(() => {
    createNoteMutation.mutate({
      title: "Untitled",
    });
  }, [createNoteMutation]);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <Header onAddClick={handleCreateNewNote} />
      {notes.isLoading ? (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <Spinner />
        </div>
      ) : notes.isError ? (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <p>Something went wrong</p>
          <button onClick={() => notes.refetch()}>Retry</button>
        </div>
      ) : !notes.data || notes.data.length === 0 ? (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <p>Empty List</p>
          <button onClick={handleCreateNewNote}>Create new Note</button>
        </div>
      ) : (
        <nav className="h-full w-full flex-1 overflow-y-auto p-2">
          <SidebarItemGroup>
            {notes.data?.map((note) => (
              <Link key={note.id} to={`note/${note.id}`}>
                {({ isActive }) => (
                  <NoteItem
                    title={note.title}
                    subtitle={`${moment(note.updatedAt).format("MMM DD, YY")}`}
                    isActive={isActive}
                  />
                )}
              </Link>
            ))}
          </SidebarItemGroup>
        </nav>
      )}
    </div>
  );
};

export default NotebookColumn;

const Header = (props: { onAddClick: () => void }) => {
  const { onAddClick } = props;
  return (
    <div className="flex h-12 w-full items-center border-b border-gray-100 px-2 dark:border-gray-800">
      <p className="flex-1 truncate px-2 text-lg font-bold">All Notes</p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-black active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white dark:active:bg-gray-700"
          onClick={onAddClick}
        >
          <MdAdd className="text-2xl" />
        </button>
      </div>
    </div>
  );
};
