import { ReactNode } from "react";

type Props = {
  title: string;
  children?: ReactNode;
};
const SecondarySidebarHeader = (props: Props) => {
  const { children, title } = props;
  return (
    <div className="flex h-12 w-full items-center border-b border-gray-100 px-2 dark:border-gray-800">
      <p className="flex-1 truncate px-2 text-lg font-medium">{title}</p>
      <div className="flex items-center gap-1">{children}</div>
    </div>
  );
};

export default SecondarySidebarHeader;
