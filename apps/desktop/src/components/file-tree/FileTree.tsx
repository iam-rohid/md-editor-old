import { MdFolderOpen, MdDescription } from "react-icons/md";
import "./file-tree.scss";

const FileTree = () => {
  return (
    <ul className="file-tree">
      <li className="file">
        <button>
          <div className="icon">
            <MdDescription />
          </div>
          <p className="label">File 1</p>
        </button>
      </li>
      <li className="file">
        <button>
          <div className="icon">
            <MdFolderOpen />
          </div>
          <p className="label">
            File 1 Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eveniet nihil beatae odit.
          </p>
        </button>
        <ul>
          <li className="file">
            <button
              style={{
                paddingLeft: `${1 * 1.5}em`,
              }}
            >
              <div className="icon">
                <MdDescription />
              </div>
              <p className="label">File 1</p>
            </button>
          </li>
          <li className="file active">
            <button
              style={{
                paddingLeft: `${1 * 1.5}em`,
              }}
            >
              <div className="icon">
                <MdDescription />
              </div>
              <p className="label">File 1</p>
            </button>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default FileTree;
