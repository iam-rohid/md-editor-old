import { ReactNode } from "react";

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
    <div className="mb-4 flex flex-col gap-px">
      {!!title && (
        <div className="flex h-8 items-center">
          <p className="flex-1 truncate px-2 text-sm uppercase text-gray-600 dark:text-gray-300">
            {title}
          </p>
          {!!actions && actions.length > 0 && (
            <div className="flex items-center justify-end gap-1">
              {actions?.map((action, i) => (
                <button
                  key={i}
                  type="button"
                  className="flex h-7 w-7 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-black active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white dark:active:bg-gray-700"
                >
                  <span className="text-xl">{action.icon}</span>
                </button>
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
