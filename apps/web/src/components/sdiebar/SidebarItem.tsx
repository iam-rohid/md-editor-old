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
          "bg-gray-200 dark:bg-gray-700": isActive,
          "hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700":
            !isActive,
        }
      )}
    >
      <span className="text-xl">{icon}</span>
      <span className="flex-1 truncate">{label}</span>
    </div>
  );
};

export default SidebarItem;
