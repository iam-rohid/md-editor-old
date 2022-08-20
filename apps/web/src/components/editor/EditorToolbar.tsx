import { Note } from "@mdotion/store";

type Props = {
  note: Note;
};

const EditorToolbar = (props: Props) => {
  const { note } = props;
  return (
    <div className="flex h-12 w-full items-center overflow-hidden border-b border-gray-100 px-2 dark:border-gray-800">
      <p className="flex-1 truncate px-2 text-lg font-medium">
        {note.title || "New Note"}
      </p>
    </div>
  );
};

export default EditorToolbar;
