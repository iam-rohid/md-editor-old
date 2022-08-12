import {
  MdFileCopy,
  MdPerson,
  MdSearch,
  MdSettings,
  MdStar,
} from "react-icons/md";
import "./activity-bar.scss";

const ActivityBar = () => {
  return (
    <div
      className="activity-bar"
      style={{
        width: `${4}rem`,
      }}
    >
      <div className="button-list" style={{ flex: 1 }}>
        <button className="icon-button active" aria-label="File Explorer">
          <MdFileCopy />
        </button>
        <button className="icon-button" aria-label="Search">
          <MdSearch />
        </button>
        <button className="icon-button" aria-label="Important">
          <MdStar />
        </button>
      </div>
      <div className="button-list">
        <button className="icon-button" aria-label="Account">
          <MdPerson />
        </button>
        <button className="icon-button" aria-label="Settings">
          <MdSettings />
        </button>
      </div>
    </div>
  );
};

export default ActivityBar;
