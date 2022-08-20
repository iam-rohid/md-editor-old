import { ReactNode } from "react";
import classNames from "classnames";

type Props = {
  label: string;
  icon: ReactNode;
  isActive?: boolean;
};

const SidebarItem = (props: Props) => {
  const { label, icon, isActive } = props;
  return (
    <div
      className={classNames(
        "flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1",
        {
          "bg-primary-500 text-white dark:bg-primary-500 dark:text-white":
            isActive,
          "hover:bg-gray-200 dark:hover:bg-gray-700": !isActive,
        }
      )}
    >
      <span className="text-xl">{icon}</span>
      <span className="flex-1 truncate">{label}</span>
    </div>
  );
};

export default SidebarItem;
