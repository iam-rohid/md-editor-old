import { FileExplorerToolbar } from "@/components/file-explorer-toolbar";
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
    </div>
  );
};

export default FileExplorer;
