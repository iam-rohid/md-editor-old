import { ReactNode } from "react";
import NotebookColumn from "./NotebookColumn";

type Props = {
  children: ReactNode;
};

const SecondarySidebar = (props: Props) => {
  const { children } = props;
  return (
    <div
      className="border-r border-gray-50 bg-white dark:border-gray-900 dark:bg-black"
      style={{ width: 260 }}
    >
      {children}
    </div>
  );
};

export default SecondarySidebar;
