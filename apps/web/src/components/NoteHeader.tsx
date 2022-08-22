import {
  Note,
  updateNote,
  useAppDispatch,
  useAppSelector,
} from "@mdotion/store";
import {
  MdExpandMore,
  MdFolder,
  MdMoreVert,
  MdStar,
  MdStarOutline,
} from "react-icons/md";
import IconButton from "./IconButton";
import { useCallback } from "react";

type Props = {
  note: Note;
};

const NoteHeader = (props: Props) => {
  const { note } = props;
  const notebook = useAppSelector((state) =>
    state.notebooks.data.find((nb) => nb.id === note.notebookId)
  );
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    state.notes.favoriteNotes.includes(note.id)
  );

  const toggleFavorite = useCallback(() => {
    dispatch(
      updateNote({
        id: note.id,
        dto: {
          isFavorite: !isFavorite,
        },
      })
    );
  }, [dispatch, isFavorite, note]);

  return (
    <header className="border-b border-gray-100 dark:border-black">
      <div className="flex h-12 w-full items-center overflow-hidden px-2">
        <p className="flex-1 truncate px-2 text-xl font-bold">
          {note.title || "New Note"}
        </p>
        <div className="flex flex-row items-center justify-end gap-1">
          <IconButton
            icon={
              isFavorite ? (
                <MdStar className="text-yellow-500" />
              ) : (
                <MdStarOutline />
              )
            }
            onClick={toggleFavorite}
          />
          <IconButton icon={<MdMoreVert />} />
        </div>
      </div>
      <div className="flex h-10 w-full items-center gap-2 px-4">
        <button className="flex h-8 items-center gap-1.5 rounded-md border border-gray-200 px-2 text-left hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700">
          <span className="text-xl leading-5">
            <MdFolder />
          </span>
          <p className="text-sm">{notebook ? notebook.title : "All Notes"}</p>
          <span className="text-xl leading-5">
            <MdExpandMore />
          </span>
        </button>
      </div>
    </header>
  );
};

export default NoteHeader;
