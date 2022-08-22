import { useAppSelector } from "@mdotion/store";
import React from "react";
import { MdPerson } from "react-icons/md";

const PrimarySidebarFooter = () => {
  const { data: user } = useAppSelector((state) => state.user);

  return (
    <div className="border-t border-gray-100 px-2 dark:border-black">
      <div className="flex items-center gap-2 rounded-md px-3 py-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
          {!!user?.photoURL ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user?.photoURL} alt="User Photo" />
          ) : (
            <MdPerson className="text-2xl text-gray-600 dark:text-gray-300" />
          )}
        </div>
        <div className="flex flex-1 flex-col overflow-hidden">
          <p className="truncate font-medium">{user?.fullname}</p>
          <p className="truncate text-sm leading-4 text-gray-600 dark:text-gray-400">
            {user?.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrimarySidebarFooter;
