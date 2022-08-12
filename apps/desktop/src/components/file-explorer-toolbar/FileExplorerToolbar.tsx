import { MdCreateNewFolder, MdEdit, MdNoteAdd } from "react-icons/md";
import "./file-explorer-toolbar.scss";

const FileExplorerToolbar = () => {
  return (
    <div className="toolbar">
      <div className="button-list">
        <button className="icon-button">
          <MdNoteAdd />
        </button>
        <button className="icon-button">
          <MdCreateNewFolder />
        </button>
        <button className="icon-button">
          <MdEdit />
        </button>
      </div>
    </div>
  );
};

export default FileExplorerToolbar;
