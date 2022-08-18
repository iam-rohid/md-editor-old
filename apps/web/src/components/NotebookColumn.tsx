import {
  Box,
  Flex,
  Text,
  Icon,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import moment from "moment";
import { MdAdd } from "react-icons/md";
import NoteItem from "./NoteItem";
import SidebarItemGroup from "./SidebarItemGroup";

const NotebookColumn = () => {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <Header />
      <nav className="h-full w-full flex-1 overflow-y-auto p-2">
        <SidebarItemGroup title="Pinned">
          <NoteItem
            title="Untitled"
            subtitle={`${moment().format("MMM DD, YY")}`}
          />
          <NoteItem
            title="Untitled"
            subtitle={`${moment().format("MMM DD, YY")}`}
          />
          <NoteItem
            title="Untitled"
            subtitle={`${moment().format("MMM DD, YY")}`}
            isActive
          />
          <NoteItem
            title="Untitled"
            subtitle={`${moment().format("MMM DD, YY")}`}
          />
          <NoteItem
            title="Untitled"
            subtitle={`${moment().format("MMM DD, YY")}`}
          />
          <NoteItem
            title="Untitled"
            subtitle={`${moment().format("MMM DD, YY")}`}
          />
        </SidebarItemGroup>
      </nav>
    </div>
  );
};

export default NotebookColumn;

const Header = () => {
  return (
    <div className="flex h-12 w-full items-center border-b border-gray-50 px-2 dark:border-gray-900">
      <p className="flex-1 truncate px-2 text-lg font-bold">All Notes</p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-black active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white dark:active:bg-gray-700"
        >
          <MdAdd className="text-2xl" />
        </button>
      </div>
    </div>
  );
};
