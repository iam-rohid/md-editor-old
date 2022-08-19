import NoteItem from "@/components/sdiebar/NoteItem";
import SecondarySidebar from "@/components/sdiebar/secondary-sidebar/SecondarySidebar";
import SecondarySidebarHeader from "@/components/sdiebar/secondary-sidebar/SecondarySidebarHeader";
import SidebarItemGroup from "@/components/sdiebar/SidebarItemGroup";
import SidebarNav from "@/components/sdiebar/SidebarNav";
import { createNote, useAppDispatch, useAppSelector } from "@mdotion/store";
import { Link, Outlet, useMatch } from "@tanstack/react-location";
import moment from "moment";
import { useCallback } from "react";
import { MdAdd } from "react-icons/md";

const Notebook = () => {
  const {
    params: { notebookId },
  } = useMatch();
  const { notebook, notes } = useAppSelector((state) => ({
    notebook: state.notebooks.data.find((n) => n.id === notebookId),
    notes: state.notes.data.filter((n) => n.notebookId === notebookId),
  }));

  const dispatch = useAppDispatch();
  const onCreateNote = useCallback(() => {
    dispatch(
      createNote({
        title: "Untitled",
        notebookId,
      })
    );
  }, [dispatch, notebookId]);

  if (!notebook) {
    return <p>Notebook not found</p>;
  }

  return (
    <>
      <SecondarySidebar>
        <SecondarySidebarHeader title={notebook.title}>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-black active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white dark:active:bg-gray-700"
            onClick={onCreateNote}
          >
            <MdAdd className="text-2xl" />
          </button>
        </SecondarySidebarHeader>
        <SidebarNav>
          <SidebarItemGroup>
            {notes.map((note) => (
              <Link key={note.id} to={`note/${note.id}`}>
                {({ isActive }) => <NoteItem note={note} isActive={isActive} />}
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
