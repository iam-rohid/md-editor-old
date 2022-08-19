import { Note } from "@mdotion/store";
import { Link } from "@tanstack/react-location";
import moment from "moment";
import NoteItem from "./NoteItem";
import SidebarItemGroup from "./SidebarItemGroup";

type Props = {
  notes: Note[];
};

const NotesList = (props: Props) => {
  const { notes } = props;
  return (
    <nav className="h-full w-full flex-1 overflow-y-auto p-2">
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
    </nav>
  );
};

export default NotesList;
