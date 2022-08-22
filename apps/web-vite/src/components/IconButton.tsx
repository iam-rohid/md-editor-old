import React, { forwardRef, ReactNode } from "react";
import classNames from "classnames";

type IconButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  icon: ReactNode;
  label?: string;
  size?: "sm" | "md" | "lg";
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const { icon, label, onClick, size = "md" } = props;
    return (
      <button
        aria-label={label}
        title={label}
        type="button"
        className={classNames(
          "flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
          {
            "h-7 w-7": size === "sm",
            "h-9 w-9": size === "md",
            "h-10 w-10": size === "lg",
          }
        )}
        onClick={onClick}
      >
        <span
          className={classNames({
            "text-xl": size === "sm",
            "text-2xl": size === "md",
            "text-3xl": size === "lg",
          })}
        >
          {icon}
        </span>
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
