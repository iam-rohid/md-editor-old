import { Link } from "@tanstack/react-location";
import { MdList, MdSearch, MdSettings, MdStar } from "react-icons/md";
import SidebarButton from "./SidebarButton";
import SidebarItemGroup from "./SidebarItemGroup";
import PrimarySidebarHeader from "./PrimarySidebarHeader";
import NotebooksList from "./NotebooksList";
import TagsList from "./TagsList";
import { useEffect } from "react";
import {
  getNotebooksAsync,
  getAllNotesAsync,
  useAppDispatch,
  useAppSelector,
} from "@mdotion/store";

const PrimarySidebar = () => {
  const notebookStatus = useAppSelector((state) => state.notebook.status);
  const noteStatus = useAppSelector((state) => state.note.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (notebookStatus === "idle") {
      dispatch(getNotebooksAsync());
    }
    if (noteStatus === "idle") {
      dispatch(getAllNotesAsync());
    }
  }, [notebookStatus, noteStatus, dispatch]);

  return (
    <div
      className="flex flex-col overflow-hidden border-r border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900"
      style={{
        width: 220,
      }}
    >
      <PrimarySidebarHeader />
      <nav className="h-full w-full flex-1 overflow-y-auto p-2">
        <SidebarItemGroup>
          <SidebarButton icon={<MdSearch />} label="Search" />
          <Link to="all">
            {({ isActive }) => (
              <SidebarButton
                icon={<MdList />}
                label="All Notes"
                isActive={isActive}
              />
            )}
          </Link>
          <Link to="favorites">
            {({ isActive }) => (
              <SidebarButton
                icon={<MdStar />}
                label="Favorites"
                isActive={isActive}
              />
            )}
          </Link>
          <Link to="settings">
            {({ isActive }) => (
              <SidebarButton
                icon={<MdSettings />}
                label="Settings"
                isActive={isActive}
              />
            )}
          </Link>
        </SidebarItemGroup>
        <NotebooksList />
        <TagsList />
      </nav>
    </div>
  );
};

export default PrimarySidebar;
