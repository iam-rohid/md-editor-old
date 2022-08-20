import {
  Note,
  updateNote,
  useAppDispatch,
  useAppSelector,
} from "@mdotion/store";
import { MdMoreVert, MdStar, MdStarOutline } from "react-icons/md";
import IconButton from "../IconButton";
import { useCallback } from "react";

type Props = {
  note: Note;
};

const EditorToolbar = (props: Props) => {
  const { note } = props;
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
    <div className="flex h-12 w-full items-center overflow-hidden border-b border-gray-100 px-2 dark:border-black">
      <p className="flex-1 truncate px-2 text-lg font-medium">
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
  );
};

export default EditorToolbar;
