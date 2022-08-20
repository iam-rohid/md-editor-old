import SecondarySidebar from "@/components/sdiebar/secondary-sidebar/SecondarySidebar";
import { Link, Outlet } from "@tanstack/react-location";
import SidebarItemGroup from "@/components/sdiebar/SidebarItemGroup";
import NoteItem from "@/components/sdiebar/NoteItem";
import SidebarNav from "@/components/sdiebar/SidebarNav";
import SecondarySidebarHeader from "@/components/sdiebar/secondary-sidebar/SecondarySidebarHeader";
import { useAppSelector } from "@mdotion/store";
import moment from "moment";

const Favorites = () => {
  const notes = useAppSelector((state) => {
    let notes = [
      ...state.notes.data.filter((note) =>
        state.notes.favoriteNotes.includes(note.id)
      ),
    ];

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

    return notes;
  });
  return (
    <>
      <SecondarySidebar>
        <SecondarySidebarHeader title="Favorites" />
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

export default Favorites;
