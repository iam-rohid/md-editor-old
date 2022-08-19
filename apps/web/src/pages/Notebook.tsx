import { getNotesForNotebookAsync, createNoteAsync } from "@/api/noteApi";
import { getNotebookAsync } from "@/api/notebookApi";
import NoteItem from "@/components/NoteItem";
import SecondarySidebar from "@/components/SecondarySidebar";
import SecondarySidebarHeader from "@/components/SecondarySidebarHeader";
import SidebarItemGroup from "@/components/SidebarItemGroup";
import SidebarNav from "@/components/SidebarNav";
import { Link, Outlet, useMatch, useNavigate } from "@tanstack/react-location";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import moment from "moment";
import { useCallback } from "react";
import { MdAdd } from "react-icons/md";

const Notebook = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    params: { notebookId },
  } = useMatch();
  const notebook = useQuery(["notebook", notebookId], ({ queryKey }) =>
    getNotebookAsync(queryKey[1])
  );
  const notes = useQuery(["note", notebookId], ({ queryKey }) =>
    getNotesForNotebookAsync(queryKey[1])
  );

  const createNoteMutation = useMutation(createNoteAsync, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["note", notebookId]);
      navigate({
        to: `notes/${data.id}`,
      });
    },
  });

  const handleCreateNewNote = useCallback(() => {
    createNoteMutation.mutate({
      title: "Untitled",
      notebookId,
    });
  }, [createNoteMutation, notebookId]);

  return (
    <>
      <SecondarySidebar>
        <SecondarySidebarHeader title={notebook.data?.title || ""}>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-black active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white dark:active:bg-gray-700"
            onClick={handleCreateNewNote}
          >
            <MdAdd className="text-2xl" />
          </button>
        </SecondarySidebarHeader>
        <SidebarNav>
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
        </SidebarNav>
      </SecondarySidebar>
      <Outlet />
    </>
  );
};

export default Notebook;
