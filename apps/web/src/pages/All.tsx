import { useCallback, useRef } from "react";
import { createNoteAsync, getAllNotesAsync } from "@/api/noteApi";
import SecondarySidebar from "@/components/SecondarySidebar";
import { Link, Outlet, useNavigate } from "@tanstack/react-location";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SidebarItemGroup from "@/components/SidebarItemGroup";
import NoteItem from "@/components/NoteItem";
import moment from "moment";
import SidebarNav from "@/components/SidebarNav";
import SecondarySidebarHeader from "@/components/SecondarySidebarHeader";
import { MdAdd } from "react-icons/md";

const All = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const queryKey = useRef(["notebooks", "all"]);
  const notes = useQuery(queryKey.current, getAllNotesAsync);

  const createNoteMutation = useMutation(createNoteAsync, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(queryKey.current);
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
    <>
      <SecondarySidebar>
        <SecondarySidebarHeader title="All Notes">
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

export default All;
