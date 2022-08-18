import { getNotebooksAsync } from "@/api/notebookApi";
import { Link, useRouter } from "@tanstack/react-location";
import { useQuery } from "@tanstack/react-query";
import { MdAdd, MdFolder } from "react-icons/md";
import SidebarButton from "./SidebarButton";
import SidebarItemGroup from "./SidebarItemGroup";
import Spinner from "./Spinner";
import CreateNotebookDialog from "./dialogs/CreateNotebookDialog";
import { useState } from "react";
import { NOTEBOOKS_KEY } from "@/constants/keys";

const NotebooksList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const notebooks = useQuery([NOTEBOOKS_KEY], getNotebooksAsync);
  const router = useRouter();

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
        {notebooks.status === "loading" ? (
          <div className="flex h-32 w-full flex-col items-center justify-center gap-2 text-center">
            <Spinner />
          </div>
        ) : notebooks.status === "error" ? (
          <div className="flex h-32 w-full flex-col items-center justify-center gap-2 text-center">
            <p>Failed to load notebooks</p>
            <button onClick={() => notebooks.refetch()}>Retry</button>
          </div>
        ) : (
          notebooks.data?.map((notebook) => (
            <Link to={`notebooks/${notebook.id}`} key={notebook.id}>
              <SidebarButton
                icon={<MdFolder />}
                label={notebook.title}
                isActive={router.state.location.pathname.startsWith(
                  `/notebooks/${notebook.id}`
                )}
              />
            </Link>
          ))
        )}
      </SidebarItemGroup>
      <CreateNotebookDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default NotebooksList;
