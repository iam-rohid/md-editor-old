import { Link } from "@tanstack/react-location";
import { MdDelete, MdList, MdSearch, MdSettings, MdStar } from "react-icons/md";
import SidebarItem from "../SidebarItem";
import SidebarItemGroup from "../SidebarItemGroup";
import PrimarySidebarHeader from "./PrimarySidebarHeader";
import NotebooksList from "../NotebooksList";
import { useEffect } from "react";
import {
  getNotebooks,
  getAllNotes,
  useAppDispatch,
  useAppSelector,
} from "@mdotion/store";
import PrimarySidebarFooter from "./PrimarySidebarFooter";

const PrimarySidebar = () => {
  const notebookStatus = useAppSelector((state) => state.notebooks.status);
  const noteStatus = useAppSelector((state) => state.notes.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (notebookStatus === "idle") {
      dispatch(getNotebooks());
    }
    if (noteStatus === "idle") {
      dispatch(getAllNotes());
    }
  }, [notebookStatus, noteStatus, dispatch]);

  return (
    <div
      className="flex flex-col border-r border-gray-100 bg-gray-50 dark:border-black dark:bg-gray-800"
      style={{
        width: 240,
      }}
    >
      <PrimarySidebarHeader />
      <nav className="h-full w-full flex-1 overflow-y-auto p-2">
        <SidebarItemGroup>
          {/* <SidebarItem icon={<MdSearch />} label="Search" /> */}
          <Link to="all">
            {({ isActive }) => (
              <SidebarItem
                icon={<MdList />}
                label="All Notes"
                isActive={isActive}
              />
            )}
          </Link>
          <Link to="favorites">
            {({ isActive }) => (
              <SidebarItem
                icon={<MdStar />}
                label="Favorites"
                isActive={isActive}
              />
            )}
          </Link>
          <Link to="trash">
            {({ isActive }) => (
              <SidebarItem
                icon={<MdDelete />}
                label="Trash"
                isActive={isActive}
              />
            )}
          </Link>
          {/* <Link to="settings">
            {({ isActive }) => (
              <SidebarItem
                icon={<MdSettings />}
                label="Settings"
                isActive={isActive}
              />
            )}
          </Link> */}
        </SidebarItemGroup>
        <NotebooksList />
        {/* <TagsList /> */}
      </nav>
      <PrimarySidebarFooter />
    </div>
  );
};

export default PrimarySidebar;
