import { useCallback } from "react";
import SecondarySidebar from "@/components/sdiebar/secondary-sidebar/SecondarySidebar";
import { Link, Outlet } from "@tanstack/react-location";
import SidebarItemGroup from "@/components/sdiebar/SidebarItemGroup";
import NoteItem from "@/components/sdiebar/NoteItem";
import moment from "moment";
import SidebarNav from "@/components/sdiebar/SidebarNav";
import SecondarySidebarHeader from "@/components/sdiebar/secondary-sidebar/SecondarySidebarHeader";
import { MdAdd } from "react-icons/md";
import { createNote, useAppDispatch, useAppSelector } from "@mdotion/store";

const Favorites = () => {
  const notes = useAppSelector((state) => state.notes.data);
  const dispatch = useAppDispatch();
  const onCreateNote = useCallback(() => {
    dispatch(
      createNote({
        title: "Untitled",
      })
    );
  }, [dispatch]);

  return (
    <>
      <SecondarySidebar>
        <SecondarySidebarHeader title="All Notes">
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

export default Favorites;
