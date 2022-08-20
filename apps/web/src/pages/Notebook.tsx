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
  const notebook = useAppSelector((state) => {
    let notebook = state.notebooks.data.find((n) => n.id === notebookId);
    if (notebook) {
      let notes = state.notes.data
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
      notebook = {
        ...notebook,
        notes,
      };
    }
    return notebook;
  });

  const dispatch = useAppDispatch();
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
          <IconButton icon={<MdFilterList />} label="Delete Note" />
        </SecondarySidebarHeader>
        <SidebarNav>
          <SidebarItemGroup>
            {notebook.notes?.map((note) => (
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
