import { useAppSelector } from "@mdotion/store";
import { Link } from "@tanstack/react-location";
import { useCallback } from "react";
import { MdAdd, MdTag } from "react-icons/md";
import Spinner from "../Spinner";
import SidebarItem from "./SidebarItem";
import SidebarItemGroup from "./SidebarItemGroup";

const TagsList = () => {
  const { data: tags, status } = useAppSelector((state) => state.tags);

  const onCreateTag = useCallback(() => {}, []);

  return (
    <SidebarItemGroup
      title="Tags"
      actions={[
        {
          label: "Add Tag",
          icon: <MdAdd />,
          onClick: onCreateTag,
        },
      ]}
    >
      {status === "error" ? (
        <div className="flex w-full flex-col items-center justify-center gap-2 py-6 px-2 text-center text-gray-500 dark:text-gray-500">
          <p>Something went wrong!</p>
          <button className="flex items-center justify-center gap-1 rounded-md px-2 py-1 text-gray-600 hover:bg-gray-100 hover:text-black active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white dark:active:bg-gray-700">
            Retry
          </button>
        </div>
      ) : status === "loading" ? (
        <div className="flex w-full flex-col items-center justify-center py-6 px-2 text-center text-gray-500 dark:text-gray-500">
          <Spinner />
        </div>
      ) : tags.length === 0 ? (
        <div className="flex w-full flex-col items-center justify-center gap-2 py-6 px-2 text-center text-gray-500 dark:text-gray-500">
          <p>You don&apos;t have any tags</p>
          <button
            className="flex items-center justify-center gap-1 rounded-md px-2 py-1 text-gray-600 hover:bg-gray-100 hover:text-black active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white dark:active:bg-gray-700"
            onClick={onCreateTag}
          >
            <MdAdd className="text-xl" />
            Create Tag
          </button>
        </div>
      ) : (
        tags.map((tag) => (
          <Link to={`tags/${tag.id}`}>
            {({ isActive }) => (
              <SidebarItem
                icon={<MdTag />}
                label={tag.title}
                isActive={isActive}
              />
            )}
          </Link>
        ))
      )}
    </SidebarItemGroup>
  );
};

export default TagsList;
