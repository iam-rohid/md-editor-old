import { useCallback } from "react";
import SecondarySidebar from "@/components/SecondarySidebar";
import { Link, Outlet } from "@tanstack/react-location";
import SidebarItemGroup from "@/components/SidebarItemGroup";
import NoteItem from "@/components/NoteItem";
import moment from "moment";
import SidebarNav from "@/components/SidebarNav";
import SecondarySidebarHeader from "@/components/SecondarySidebarHeader";
import { MdAdd } from "react-icons/md";
import {
  createNoteAsync,
  useAppDispatch,
  useAppSelector,
} from "@mdotion/store";

const All = () => {
  const notes = useAppSelector((state) => state.note.data);
  const dispatch = useAppDispatch();
  const onCreateNote = useCallback(() => {
    dispatch(
      createNoteAsync({
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

export default All;
