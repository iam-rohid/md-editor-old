import { FileExplorerToolbar } from "@/components/file-explorer-toolbar";
import { MdFolder, MdNote } from "react-icons/md";
import { FileTree } from "../file-tree";
import "./file-explorer.scss";

const FileExplorer = () => {
  return (
    <div
      className="file-explorer"
      style={{
        left: `${4}rem`,
        width: `${20}rem`,
      }}
    >
      <FileExplorerToolbar />
      <div className="container">
        <FileTree />
      </div>
    </div>
  );
};

export default FileExplorer;
