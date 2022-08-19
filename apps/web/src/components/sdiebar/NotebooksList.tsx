import { Link } from "@tanstack/react-location";
import { MdAdd, MdFolder } from "react-icons/md";
import SidebarItem from "./SidebarItem";
import SidebarItemGroup from "./SidebarItemGroup";
import Spinner from "../Spinner";
import CreateNotebookDialog from "../dialogs/CreateNotebookDialog";
import { useCallback, useState } from "react";
import { useAppSelector } from "@mdotion/store";

const NotebooksList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, status } = useAppSelector((state) => state.notebooks);

  const onRetry = useCallback(() => {}, []);

  return (
    <>
      <SidebarItemGroup
        title="Notebooks"
        actions={[
          {
            label: "Add Notebook",
            icon: <MdAdd />,
            onClick: () => setIsOpen(true),
          },
        ]}
      >
        {status === "loading" ? (
          <div className="flex h-32 w-full flex-col items-center justify-center gap-2 text-center">
            <Spinner />
          </div>
        ) : status === "error" ? (
          <div className="flex h-32 w-full flex-col items-center justify-center gap-2 text-center">
            <p>Failed to load notebooks</p>
            <button onClick={onRetry}>Retry</button>
          </div>
        ) : (
          data.map((notebook) => (
            <Link to={`notebook/${notebook.id}`} key={notebook.id}>
              {({ isActive }) => (
                <SidebarItem
                  icon={<MdFolder />}
                  label={notebook.title}
                  isActive={isActive}
                />
              )}
            </Link>
          ))
        )}
      </SidebarItemGroup>
      <CreateNotebookDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default NotebooksList;
