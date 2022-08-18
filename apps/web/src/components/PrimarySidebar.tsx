import SITE from "@/constants/SITE";
import { useTheme } from "@/contexts/ThemeContext";
import { Link, useRouter } from "@tanstack/react-location";
import {
  MdAdd,
  MdDarkMode,
  MdFolder,
  MdLightMode,
  MdList,
  MdLogout,
  MdPerson,
  MdSearch,
  MdSettings,
  MdStar,
  MdTag,
} from "react-icons/md";
import SidebarButton from "./SidebarButton";
import SidebarItemGroup from "./SidebarItemGroup";
import { Popover } from "@headlessui/react";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { createNotebookAsync } from "@/api/notebookApi";

const PrimarySidebar = () => {
  const createNotebookMutation = useMutation(createNotebookAsync, {
    onSettled(data, error) {
      console.log({ data, error });
    },
  });

  const router = useRouter();
  return (
    <div
      className="flex flex-col overflow-hidden border-r border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900"
      style={{
        width: 220,
      }}
    >
      <Header />
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
        <SidebarItemGroup
          title="Notebooks"
          actions={[
            {
              label: "Add Notebook",
              icon: <MdAdd />,
            },
          ]}
        >
          <Link to={`notebook/${12345}`}>
            <SidebarButton
              icon={<MdFolder />}
              label="Daily logs"
              isActive={router.state.location.pathname.startsWith(
                `/notebook/${12345}`
              )}
            />
          </Link>
          <SidebarButton icon={<MdFolder />} label="My Articles" />
          <SidebarButton icon={<MdFolder />} label="Projects" />
        </SidebarItemGroup>
        <SidebarItemGroup
          title="Tags"
          actions={[
            {
              label: "Add Notebook",
              icon: <MdAdd />,
              onClick: () => {
                createNotebookMutation.mutate({
                  title: "My Notebook",
                });
                console.log("Creating Notebook");
              },
            },
          ]}
        >
          <Link to={`tag/${12345}`}>
            <SidebarButton
              icon={<MdTag />}
              label="Article"
              isActive={router.state.location.pathname.startsWith(
                `/tag/${12345}`
              )}
            />
          </Link>
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
  const { user, onLogOut } = useAuth();
  const { colorScheme, toggleColorScheme } = useTheme();
  if (!user) return null;
  return (
    <div className="flex h-12 w-full items-center px-2">
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
        <Popover>
          {({ close, open }) => (
            <>
              <Popover.Button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-black active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white dark:active:bg-gray-700"
              >
                <MdPerson className="text-2xl" />
              </Popover.Button>
              <Popover.Panel className="absolute z-20 w-64 overflow-hidden rounded-md border border-gray-100 bg-white shadow-2xl dark:border-gray-800 dark:bg-black">
                <div className="flex items-center gap-2 border-b border-gray-100 p-2 dark:border-gray-800">
                  <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-gray-50 dark:bg-gray-900">
                    {user.profile?.profileURL ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={user.profile?.profileURL}
                        alt="Profile Photo"
                        className="absolute inset-0 object-cover"
                      />
                    ) : (
                      <MdPerson className="text-2xl text-gray-600 dark:text-gray-300" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-1 overflow-hidden">
                    <p className="truncate font-medium leading-4">
                      {user.profile?.fullname}
                    </p>
                    <p className="truncate text-sm leading-4 text-gray-600 dark:text-gray-300">
                      {user.email}
                    </p>
                  </div>
                </div>
                <ul className="flex flex-col gap-px bg-gray-50 p-2 dark:bg-gray-900">
                  <Link
                    to="settings/account"
                    className="flex w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700"
                    onClick={() => {
                      close();
                    }}
                  >
                    <MdPerson className="text-xl" />
                    <span className="flex-1">Account</span>
                  </Link>
                  <button
                    className="flex w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700"
                    onClick={() => {
                      close();
                      onLogOut();
                    }}
                  >
                    <MdLogout className="text-xl" />
                    <span className="flex-1">Log Out</span>
                  </button>
                </ul>
              </Popover.Panel>
            </>
          )}
        </Popover>
      </div>
    </div>
  );
};
