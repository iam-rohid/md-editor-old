import { getFavoritesNotesAsync } from "@/api/noteApi";
import NoteItem from "@/components/NoteItem";
import SecondarySidebar from "@/components/SecondarySidebar";
import SecondarySidebarHeader from "@/components/SecondarySidebarHeader";
import SidebarItemGroup from "@/components/SidebarItemGroup";
import SidebarNav from "@/components/SidebarNav";
import { Link, Outlet } from "@tanstack/react-location";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useRef } from "react";

const Favorites = () => {
  const queryKey = useRef(["notebooks", "favorites"]);
  const notes = useQuery(queryKey.current, getFavoritesNotesAsync);

  return (
    <>
      <SecondarySidebar>
        <SecondarySidebarHeader title="Favorites" />
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

export default Favorites;
