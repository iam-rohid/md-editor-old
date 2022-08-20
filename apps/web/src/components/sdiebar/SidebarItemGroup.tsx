import { ReactNode } from "react";
import IconButton from "../IconButton";

export type SidebarNavGroupProps = {
  children: ReactNode;
  title?: string;
  actions?: {
    icon: ReactNode;
    label: string;
    onClick?: () => void;
  }[];
};

const SidebarItemGroup = (props: SidebarNavGroupProps) => {
  const { children, title, actions } = props;
  return (
    <div className="mb-4 flex flex-col">
      {!!title && (
        <div className="flex h-8 items-center">
          <p className="flex-1 truncate px-2 text-sm uppercase text-gray-600 dark:text-gray-300">
            {title}
          </p>
          {!!actions && actions.length > 0 && (
            <div className="flex items-center justify-end gap-1">
              {actions?.map((action, i) => (
                <IconButton
                  key={i}
                  icon={action.icon}
                  size="sm"
                  onClick={action.onClick}
                />
              ))}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default SidebarItemGroup;
