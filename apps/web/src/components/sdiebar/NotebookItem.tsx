import { Notebook } from "@mdotion/store";
import { Link } from "@tanstack/react-location";
import classNames from "classnames";
import { MdFolder } from "react-icons/md";

type Props = {
  notebook: Notebook;
};

const NotebookItem = (props: Props) => {
  const { notebook } = props;

  return (
    <>
      <Link to={`notebook/${notebook.id}`}>
        {({ isActive }) => (
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
            <span className="text-2xl leading-6">{<MdFolder />}</span>
            <p className="flex-1 truncate">{notebook.title}</p>
          </div>
        )}
      </Link>
    </>
  );
};

export default NotebookItem;
