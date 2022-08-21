import { ReactNode } from "react";
import classNames from "classnames";
import { MdEdit } from "react-icons/md";

type Props = {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
};

const SidebarItem = (props: Props) => {
  const { label, icon, isActive } = props;
  return (
    <div
      className={classNames(
        "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-1",
        {
          "bg-primary-500 text-white dark:bg-primary-500 dark:text-white":
            isActive,
          "hover:bg-gray-200 dark:hover:bg-gray-700": !isActive,
        }
      )}
    >
      <span className="text-2xl">{icon}</span>
      <span className="flex-1 truncate">{label}</span>
    </div>
  );
};

export default SidebarItem;
