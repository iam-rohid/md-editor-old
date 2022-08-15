import {
  MdCreateNewFolder,
  MdNoteAdd,
  MdRefresh,
  MdUnfoldLess,
} from "react-icons/md";
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
          <MdUnfoldLess />
        </button>
        <button className="icon-button">
          <MdRefresh />
        </button>
      </div>
    </div>
  );
};

export default FileExplorerToolbar;
