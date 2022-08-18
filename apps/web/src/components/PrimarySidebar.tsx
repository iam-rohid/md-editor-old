import SITE from "@/constants/SITE";
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "@tanstack/react-location";
import {
  MdAdd,
  MdDarkMode,
  MdFolder,
  MdLightMode,
  MdList,
  MdPerson,
  MdSearch,
  MdSettings,
  MdStar,
  MdTag,
} from "react-icons/md";
import SidebarButton from "./SidebarButton";
import SidebarItemGroup from "./SidebarItemGroup";

const PrimarySidebar = () => {
  return (
    <div
      className="flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900"
      style={{
        width: 220,
      }}
    >
      <Header />
      <nav className="h-full w-full flex-1 overflow-y-auto p-2">
        <SidebarItemGroup>
          <SidebarButton icon={<MdSearch />} label="Search" />
          <SidebarButton icon={<MdList />} label="All Notes" isActive />
          <SidebarButton icon={<MdStar />} label="Favorites" />
          <SidebarButton icon={<MdSettings />} label="Settings" />
        </SidebarItemGroup>
        <SidebarItemGroup
          title="Notebooks"
          actions={[
            {
              label: "Add Notebook",
              icon: <MdAdd />,
            },
          ]}
        >
          <SidebarButton icon={<MdFolder />} label="Daily logs" />
          <SidebarButton icon={<MdFolder />} label="My Articles" />
          <SidebarButton icon={<MdFolder />} label="Projects" />
        </SidebarItemGroup>
        <SidebarItemGroup
          title="Tags"
          actions={[
            {
              label: "Add Notebook",
              icon: <MdAdd />,
            },
          ]}
        >
          <SidebarButton icon={<MdTag />} label="Article" />
          <SidebarButton icon={<MdTag />} label="Reminder" />
          <SidebarButton icon={<MdTag />} label="Place" />
          <SidebarButton icon={<MdTag />} label="Gym" />
        </SidebarItemGroup>
      </nav>
    </div>
  );
};

export default PrimarySidebar;

const Header = () => {
  const { colorScheme, toggleColorScheme } = useTheme();
  return (
    <div className="flex h-14 w-full items-center px-2">
      <Link to="/" className="flex-1 truncate px-2 text-lg font-bold uppercase">
        {SITE.NAME}
      </Link>
      <div className="flex items-center gap-1">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-black active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white dark:active:bg-gray-700"
          onClick={toggleColorScheme}
        >
          {colorScheme === "light" ? (
            <MdLightMode className="text-2xl" />
          ) : (
            <MdDarkMode className="text-2xl" />
          )}
        </button>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-black active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white dark:active:bg-gray-700"
        >
          <MdPerson className="text-2xl" />
        </button>
      </div>
    </div>
  );
};
