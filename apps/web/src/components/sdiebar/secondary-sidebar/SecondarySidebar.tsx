import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const SecondarySidebar = (props: Props) => {
  const { children } = props;
  return (
    <div
      className="flex flex-col border-r border-gray-100 bg-white dark:border-black dark:bg-gray-900"
      style={{ width: 300 }}
    >
      {children}
    </div>
  );
};

export default SecondarySidebar;
