import { Note, useAppSelector } from "@mdotion/store";
import classNames from "classnames";
import moment from "moment";
import { MdFolder } from "react-icons/md";

type NoteItemProps = {
  note: Note;
  isActive?: boolean;
};

const NoteItem = (props: NoteItemProps) => {
  const { note, isActive } = props;
  const { notebook, title, description, updatedAt } = note;
  return (
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
          <div className={classNames("flex max-w-[7rem] items-center gap-1")}>
            <span className="text-md">
              <MdFolder />
            </span>
            <span className="truncate text-sm">{notebook.title}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteItem;
