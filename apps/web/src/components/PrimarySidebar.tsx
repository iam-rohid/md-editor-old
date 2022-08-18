import { Link, useRouter } from "@tanstack/react-location";
import { MdList, MdSearch, MdSettings, MdStar } from "react-icons/md";
import SidebarButton from "./SidebarButton";
import SidebarItemGroup from "./SidebarItemGroup";
import PrimarySidebarHeader from "./PrimarySidebarHeader";
import NotebooksList from "./NotebooksList";
import TagsList from "./TagsList";

const PrimarySidebar = () => {
  const router = useRouter();
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
            <SidebarButton
              icon={<MdList />}
              label="All Notes"
              isActive={router.state.location.pathname.startsWith("/all")}
            />
          </Link>
          <Link to="favorites">
            <SidebarButton
              icon={<MdStar />}
              label="Favorites"
              isActive={router.state.location.pathname.startsWith("/favorites")}
            />
          </Link>
          <Link to="settings">
            <SidebarButton
              icon={<MdSettings />}
              label="Settings"
              isActive={router.state.location.pathname.startsWith("/settings")}
            />
          </Link>
        </SidebarItemGroup>
        <NotebooksList />
        <TagsList />
      </nav>
    </div>
  );
};

export default PrimarySidebar;
