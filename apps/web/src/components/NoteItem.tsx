import classNames from "classnames";

type NoteItemProps = {
  title: string;
  subtitle: string;
  isActive?: boolean;
};

const NoteItem = (props: NoteItemProps) => {
  const { title, subtitle, isActive } = props;
  return (
    <div
      className={classNames(
        "flex cursor-pointer select-none flex-col items-center gap-1 rounded-md p-2",
        {
          "bg-gray-200 dark:bg-gray-700": isActive,
          "hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700":
            !isActive,
        }
      )}
    >
      <p className="w-full truncate leading-4">{title}</p>
      <p className="w-full truncate text-sm leading-4 text-gray-600 dark:text-gray-300">
        {subtitle}
      </p>
    </div>
  );
};

export default NoteItem;
