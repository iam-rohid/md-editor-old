import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const SidebarNav = (props: Props) => {
  const { children } = props;
  return (
    <nav className="h-full w-full flex-1 overflow-y-auto p-2">{children}</nav>
  );
};

export default SidebarNav;
