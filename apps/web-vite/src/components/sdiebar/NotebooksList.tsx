import {
  MdAdd,
  MdCreateNewFolder,
  MdDelete,
  MdEdit,
  MdNoteAdd,
} from "react-icons/md";
import SidebarItemGroup from "./SidebarItemGroup";
import Spinner from "../Spinner";
import CreateNotebookDialog from "../dialogs/CreateNotebookDialog";
import { useCallback, useState } from "react";
import { Notebook, useAppSelector } from "@mdotion/store";
import NotebookItem from "./NotebookItem";
import UpdateNotebookDialog from "../dialogs/UpdateNotebookDialog";
import * as ContextMenu from "@radix-ui/react-context-menu";

const NotebooksList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [updatableNotebook, setUpdatableNotebook] = useState<Notebook | null>(
    null
  );
  const { notebooks, status } = useAppSelector((state) => ({
    status: state.notebooks.status,
    notebooks: [...state.notebooks.data].sort((nb1, nb2) =>
      nb1.title.localeCompare(nb2.title)
    ),
  }));
  const deleteNotebook = useCallback(() => {}, []);
  const createNewNote = useCallback(() => {}, []);
  const createNewNotebook = useCallback(() => {}, []);

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
          notebooks.map((notebook) => (
            <ContextMenu.Root key={notebook.id}>
              <ContextMenu.Trigger>
                <NotebookItem notebook={notebook} />
              </ContextMenu.Trigger>
              <ContextMenu.Portal>
                <ContextMenu.Content className="w-56 overflow-hidden rounded-lg border border-gray-200 bg-white px-1 py-2 shadow-xl dark:border-gray-700 dark:bg-gray-800">
                  <ContextMenu.Item asChild>
                    <button
                      className="flex w-full items-center gap-2 truncate rounded-md px-3 py-1 text-left outline-none hover:text-white focus:bg-primary-500 focus:text-white"
                      onClick={createNewNote}
                    >
                      <MdNoteAdd className="text-xl" />
                      <p className="flex-1 truncate">New Note</p>
                    </button>
                  </ContextMenu.Item>
                  <ContextMenu.Item asChild>
                    <button
                      className="flex w-full items-center gap-2 truncate rounded-md px-3 py-1 text-left outline-none hover:text-white focus:bg-primary-500 focus:text-white"
                      onClick={createNewNotebook}
                    >
                      <MdCreateNewFolder className="text-xl" />
                      <p className="flex-1 truncate">New Notebook</p>
                    </button>
                  </ContextMenu.Item>
                  <ContextMenu.Separator className="my-2 border-t border-gray-200 dark:border-gray-700" />
                  <ContextMenu.Item asChild>
                    <button
                      className="flex w-full items-center gap-2 truncate rounded-md px-3 py-1 text-left outline-none hover:text-white focus:bg-primary-500 focus:text-white"
                      onClick={() => setUpdatableNotebook(notebook)}
                    >
                      <MdEdit className="text-xl" />
                      <p className="flex-1 truncate">Rename</p>
                    </button>
                  </ContextMenu.Item>
                  <ContextMenu.Separator className="my-2 border-t border-gray-200 dark:border-gray-700" />
                  <ContextMenu.Item asChild>
                    <button
                      className="flex w-full items-center gap-2 truncate rounded-md px-3 py-1 text-left outline-none hover:text-white focus:bg-primary-500 focus:text-white"
                      onClick={deleteNotebook}
                    >
                      <MdDelete className="text-xl" />
                      <p className="flex-1 truncate">Delete</p>
                    </button>
                  </ContextMenu.Item>
                </ContextMenu.Content>
              </ContextMenu.Portal>
            </ContextMenu.Root>
          ))
        )}
      </SidebarItemGroup>
      <CreateNotebookDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
      {!!updatableNotebook && (
        <UpdateNotebookDialog
          notebook={updatableNotebook}
          isOpen={!!updatableNotebook}
          onClose={() => setUpdatableNotebook(null)}
        />
      )}
    </>
  );
};

export default NotebooksList;
