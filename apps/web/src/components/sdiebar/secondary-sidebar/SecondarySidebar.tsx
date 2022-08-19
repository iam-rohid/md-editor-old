import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const SecondarySidebar = (props: Props) => {
  const { children } = props;
  return (
    <div
      className="flex flex-col border-r border-gray-100 bg-white dark:border-gray-800 dark:bg-black"
      style={{ width: 280 }}
    >
      {children}
    </div>
  );
};

export default SecondarySidebar;
