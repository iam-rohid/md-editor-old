import {
  createNote,
  deleteNote,
  Note,
  updateNote,
  useAppDispatch,
  useAppSelector,
} from "@mdotion/store";
import classNames from "classnames";
import moment from "moment";
import {
  MdAdd,
  MdDelete,
  MdDeleteForever,
  MdFileCopy,
  MdFolder,
  MdPushPin,
  MdRestore,
  MdStar,
} from "react-icons/md";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { useCallback } from "react";
import { useMatch } from "@tanstack/react-location";

type NoteItemProps = {
  note: Note;
  isActive?: boolean;
};

const NoteItem = (props: NoteItemProps) => {
  const { note, isActive } = props;
  const {
    params: { notebookId },
  } = useMatch();
  const { notebook, title, description, updatedAt } = note;
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    state.notes.favoriteNotes.includes(note.id)
  );
  const isPinned = useAppSelector((state) =>
    state.notes.pinnedNotes.includes(note.id)
  );

  const pinToTop = useCallback(() => {
    dispatch(
      updateNote({
        id: note.id,
        dto: {
          isPinned: !isPinned,
        },
      })
    );
  }, [isPinned, note, dispatch]);

  const toggleFavorites = useCallback(() => {
    dispatch(
      updateNote({
        id: note.id,
        dto: {
          isFavorite: !isFavorite,
        },
      })
    );
  }, [isFavorite, note, dispatch]);

  const duplicateNote = useCallback(() => {
    dispatch(
      createNote({
        title: note.title,
        body: note.body,
        description: note.description,
        notebookId: note.notebookId,
      })
    );
  }, [dispatch, note]);

  const moveToTrash = useCallback(() => {
    dispatch(
      updateNote({
        id: note.id,
        dto: {
          isDeleted: true,
        },
      })
    );
  }, [note, dispatch]);

  const restoreFromTrash = useCallback(() => {
    dispatch(
      updateNote({
        id: note.id,
        dto: {
          isDeleted: false,
        },
      })
    );
  }, [note, dispatch]);

  const deleteForever = useCallback(() => {
    dispatch(deleteNote(note.id));
  }, [note, dispatch]);

  const createNewNote = useCallback(() => {
    dispatch(
      createNote({
        title: "",
        notebookId: notebookId,
      })
    );
  }, [notebookId, dispatch]);

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        <div
          className={classNames(
            "flex cursor-pointer select-none flex-col rounded-md py-2 px-3",
            {
              "bg-primary-500 text-white dark:bg-primary-500 dark:text-white":
                isActive,
              "hover:bg-gray-100 dark:hover:bg-gray-700": !isActive,
            }
          )}
          title={title || "New Note"}
        >
          <p className="w-full truncate font-medium">{title || "New Note"}</p>
          <p className="w-full truncate text-sm">
            <span className="font-medium opacity-90">
              {moment(updatedAt).format("M/DD/YY")}
            </span>{" "}
            <span className="opacity-80">
              {description || "No additional text"}
            </span>
          </p>
          <div className="flex flex-row items-center opacity-80">
            {!!notebook && (
              <div
                className={classNames("flex max-w-[7rem] items-center gap-1")}
              >
                <span className="text-md">
                  <MdFolder />
                </span>
                <span className="truncate text-sm">{notebook.title}</span>
              </div>
            )}
          </div>
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className="w-56 overflow-hidden rounded-lg border border-gray-200 bg-white px-1 py-2 shadow-xl dark:border-gray-700 dark:bg-gray-800">
          {note.isDeleted ? (
            <>
              <ContextMenu.Item asChild>
                <button
                  className="flex w-full items-center gap-2 truncate rounded-md px-2 py-1 text-left outline-none hover:text-white focus:bg-primary-500 focus:text-white"
                  onClick={restoreFromTrash}
                >
                  <MdRestore className="text-xl" />
                  <p className="flex-1 truncate">Restore</p>
                </button>
              </ContextMenu.Item>
              <ContextMenu.Separator className="my-2 border-t border-gray-200 dark:border-gray-700" />
              <ContextMenu.Item asChild>
                <button
                  className="flex w-full items-center gap-2 truncate rounded-md px-2 py-1 text-left outline-none hover:text-white focus:bg-primary-500 focus:text-white"
                  onClick={deleteForever}
                >
                  <MdDeleteForever className="text-xl" />
                  <p className="flex-1 truncate">Delete Forever</p>
                </button>
              </ContextMenu.Item>
            </>
          ) : (
            <>
              <ContextMenu.Item asChild>
                <button
                  className="flex w-full items-center gap-2 truncate rounded-md px-2 py-1 text-left outline-none hover:text-white focus:bg-primary-500 focus:text-white"
                  onClick={pinToTop}
                >
                  <MdPushPin className="text-xl" />
                  <p className="flex-1 truncate">
                    {isPinned ? "Unpin Note" : "Pin Note"}
                  </p>
                </button>
              </ContextMenu.Item>
              <ContextMenu.Item asChild>
                <button
                  className="flex w-full items-center gap-2 truncate rounded-md px-2 py-1 text-left outline-none focus:bg-primary-500 focus:text-white"
                  onClick={toggleFavorites}
                >
                  <MdStar className="text-xl" />
                  <p className="flex-1 truncate">
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  </p>
                </button>
              </ContextMenu.Item>
              <ContextMenu.Separator className="my-2 border-t border-gray-200 dark:border-gray-700" />
              <ContextMenu.Item asChild>
                <button
                  className="flex w-full items-center gap-2 truncate rounded-md px-2 py-1 text-left outline-none hover:text-white focus:bg-primary-500 focus:text-white"
                  onClick={duplicateNote}
                >
                  <MdFileCopy className="text-xl" />
                  <p className="flex-1 truncate">Duplicate Note</p>
                </button>
              </ContextMenu.Item>
              <ContextMenu.Item asChild>
                <button
                  className="flex w-full items-center gap-2 truncate rounded-md px-2 py-1 text-left outline-none hover:text-white focus:bg-primary-500 focus:text-white"
                  onClick={moveToTrash}
                >
                  <MdDelete className="text-xl" />
                  <p className="flex-1 truncate">Move to Trash</p>
                </button>
              </ContextMenu.Item>
              <ContextMenu.Separator className="my-2 border-t border-gray-200 dark:border-gray-700" />
              <ContextMenu.Item asChild>
                <button
                  className="flex w-full items-center gap-2 truncate rounded-md px-2 py-1 text-left outline-none hover:text-white focus:bg-primary-500 focus:text-white"
                  onClick={createNewNote}
                >
                  <MdAdd className="text-xl" />
                  <p className="flex-1 truncate">New Note</p>
                </button>
              </ContextMenu.Item>
            </>
          )}
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

export default NoteItem;
