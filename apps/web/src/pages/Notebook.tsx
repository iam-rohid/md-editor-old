import IconButton from "@/components/IconButton";
import NoteItem from "@/components/sdiebar/NoteItem";
import SecondarySidebar from "@/components/sdiebar/secondary-sidebar/SecondarySidebar";
import SecondarySidebarHeader from "@/components/sdiebar/secondary-sidebar/SecondarySidebarHeader";
import SidebarItemGroup from "@/components/sdiebar/SidebarItemGroup";
import SidebarNav from "@/components/sdiebar/SidebarNav";
import { createNote, useAppDispatch, useAppSelector } from "@mdotion/store";
import { Link, Outlet, useMatch } from "@tanstack/react-location";
import moment from "moment";
import { useCallback } from "react";
import { MdFilterList, MdNoteAdd } from "react-icons/md";

const Notebook = () => {
  const {
    params: { notebookId },
  } = useMatch();
  const dispatch = useAppDispatch();
  const { notebook, notes, pinned } = useAppSelector((state) => {
    let notebook = state.notebooks.data.find((n) => n.id === notebookId);
    let notes = state.notes.data
      .filter((note) => !note.isDeleted)
      .filter((n) => n.notebookId === notebookId)
      .sort((n1, n2) => {
        if (moment(n1.updatedAt).isAfter(moment(n2.updatedAt))) {
          return -1;
        }
        if (moment(n1.updatedAt).isBefore(moment(n2.updatedAt))) {
          return 1;
        }
        return 0;
      });
    return {
      notebook,
      pinned: notes.filter((note) => state.notes.pinnedNotes.includes(note.id)),
      notes: notes.filter((note) => !state.notes.pinnedNotes.includes(note.id)),
    };
  });

  const onCreateNote = useCallback(() => {
    dispatch(
      createNote({
        title: "",
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

export default Notebook;
