import IconButton from "@/components/IconButton";
import SITE from "@/constants/SITE";
import { useTheme } from "@/contexts/ThemeContext";
import { Popover } from "@headlessui/react";
import { signOutAsync, useAppDispatch, useAppSelector } from "@mdotion/store";
import { Link } from "@tanstack/react-location";
import { useCallback } from "react";
import { MdLightMode, MdDarkMode, MdPerson, MdLogout } from "react-icons/md";

const PrimarySidebarHeader = () => {
  const user = useAppSelector((state) => state.user.data);
  const { colorScheme, toggleColorScheme } = useTheme();
  const dispatch = useAppDispatch();

  const onLogOut = useCallback(() => {
    dispatch(signOutAsync());
  }, [dispatch]);

  if (!user) return null;
  return (
    <div className="flex h-12 w-full items-center px-2">
      <Link to="/" className="flex-1 truncate px-3 text-lg font-bold uppercase">
        {SITE.NAME}
      </Link>
      <div className="flex items-center gap-1">
        <IconButton
          icon={colorScheme === "light" ? <MdLightMode /> : <MdDarkMode />}
          onClick={toggleColorScheme}
        />
        <Popover>
          {({ close }) => (
            <>
              <Popover.Button as={IconButton} icon={<MdPerson />}>
                <MdPerson className="text-2xl" />
              </Popover.Button>
              <Popover.Panel className="absolute z-20 w-64 overflow-hidden rounded-md border border-gray-100 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
                <div className="flex items-center gap-2 border-b border-gray-100 p-2 dark:border-black">
                  <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-gray-50 dark:bg-gray-800">
                    {user.photoURL ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={user.photoURL}
                        alt="Profile Photo"
                        className="absolute inset-0 object-cover"
                      />
                    ) : (
                      <MdPerson className="text-2xl text-gray-600 dark:text-gray-300" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-1 overflow-hidden">
                    <p className="truncate font-medium leading-4">
                      {user.fullname}
                    </p>
                    <p className="truncate text-sm leading-4 text-gray-600 dark:text-gray-300">
                      {user.email}
                    </p>
                  </div>
                </div>
                <ul className="flex flex-col gap-px bg-gray-50 p-2 dark:bg-gray-800">
                  <Link
                    to="settings/account"
                    className="flex w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-700 dark:active:bg-gray-600"
                    onClick={() => {
                      close();
                    }}
                  >
                    <MdPerson className="text-xl" />
                    <span className="flex-1">Account</span>
                  </Link>
                  <button
                    className="flex w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-700 dark:active:bg-gray-600"
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

export default PrimarySidebarHeader;
