import { useState } from "react";

type Props = {
  title: string;
  onTitleChange: (value: string) => void;
};

const EditorToolbar = (props: Props) => {
  const { title, onTitleChange } = props;
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="flex h-12 w-full items-center border-b border-gray-100 px-2 dark:border-gray-800">
      {isEditing ? (
        <input
          type="text"
          className="flex-1 rounded-md border-none bg-transparent px-2 py-1 text-lg font-bold"
          defaultValue={title}
          onBlur={(e) => {
            setIsEditing(false);
            onTitleChange(e.currentTarget.value);
          }}
          autoFocus
        />
      ) : (
        <p
          className="flex-1 px-2 py-1 text-lg font-bold"
          onClick={() => setIsEditing(true)}
        >
          {title}
        </p>
      )}
    </div>
  );
};

export default EditorToolbar;
