import { Note } from "@mdotion/store";
import classNames from "classnames";
import moment from "moment";

type NoteItemProps = {
  note: Note;
  isActive?: boolean;
};

const NoteItem = (props: NoteItemProps) => {
  const { note, isActive } = props;

  return (
    <div
      className={classNames(
        "flex cursor-pointer select-none flex-col items-center rounded-md py-2 px-3",
        {
          "bg-gray-200 dark:bg-gray-700": isActive,
          "hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700":
            !isActive,
        }
      )}
    >
      <p className="w-full truncate text-black dark:text-white">
        {note.title || "New Note"}
      </p>
      <p className="w-full truncate text-sm">
        <span className="font-semibold text-gray-600 dark:text-gray-300">
          {moment(note.updatedAt).format("M/DD/YY")}
        </span>{" "}
        <span className="text-gray-500 dark:text-gray-400">
          {note.description || "No additional text"}
        </span>
      </p>
    </div>
  );
};

export default NoteItem;
