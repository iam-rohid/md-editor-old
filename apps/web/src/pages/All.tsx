import { useCallback } from "react";
import SecondarySidebar from "@/components/sdiebar/secondary-sidebar/SecondarySidebar";
import { Link, Outlet } from "@tanstack/react-location";
import SidebarItemGroup from "@/components/sdiebar/SidebarItemGroup";
import NoteItem from "@/components/sdiebar/NoteItem";
import moment from "moment";
import SidebarNav from "@/components/sdiebar/SidebarNav";
import SecondarySidebarHeader from "@/components/sdiebar/secondary-sidebar/SecondarySidebarHeader";
import { MdFilterList, MdNoteAdd } from "react-icons/md";
import { createNote, useAppDispatch, useAppSelector } from "@mdotion/store";
import IconButton from "@/components/IconButton";

const All = () => {
  const { notes, pinned } = useAppSelector((state) => {
    let notes = state.notes.data.filter((note) => !note.isDeleted);

    notes = notes.map((note) => {
      if (note.notebookId) {
        return {
          ...note,
          notebook: state.notebooks.data.find(
            (nb) => nb.id === note.notebookId
          ),
        };
      }
      return note;
    });

    notes = notes.sort((n1, n2) => {
      if (moment(n1.updatedAt).isAfter(moment(n2.updatedAt))) {
        return -1;
      }
      if (moment(n1.updatedAt).isBefore(moment(n2.updatedAt))) {
        return 1;
      }
      return 0;
    });

    return {
      pinned: notes.filter((note) => state.notes.pinnedNotes.includes(note.id)),
      notes: notes.filter((note) => !state.notes.pinnedNotes.includes(note.id)),
    };
  });
  const dispatch = useAppDispatch();
  const onCreateNote = useCallback(() => {
    dispatch(
      createNote({
        title: "",
      })
    );
  }, [dispatch]);

  return (
    <>
      <SecondarySidebar>
        <SecondarySidebarHeader title="All Notes">
          <IconButton
            icon={<MdNoteAdd />}
            label="Create new note"
            onClick={onCreateNote}
          />
        </SecondarySidebarHeader>
        <SidebarNav>
          {pinned.length > 0 && (
            <SidebarItemGroup title="Pinned">
              {pinned.map((note) => (
                <Link key={note.id} to={`note/${note.id}`}>
                  {({ isActive }) => (
                    <NoteItem note={note} isActive={isActive} />
                  )}
                </Link>
              ))}
            </SidebarItemGroup>
          )}
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

export default All;
