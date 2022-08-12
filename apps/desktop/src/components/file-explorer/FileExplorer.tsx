import { FileExplorerToolbar } from "@/components/file-explorer-toolbar";
import "./file-explorer.scss";

const FileExplorer = () => {
  return (
    <div
      className="file-explorer"
      style={{
        left: 56,
        width: 260,
      }}
    >
      <FileExplorerToolbar />
    </div>
  );
};

export default FileExplorer;
