import {
  MdCode,
  MdMoreVert,
  MdRedo,
  MdSplitscreen,
  MdUndo,
  MdVisibility,
} from "react-icons/md";
import "./doc-toolbar.scss";

const DocToolbar = () => {
  return (
    <div className="doc-toolbar">
      <div style={{ flex: 1 }} />
      <div className="button-list">
        <button className="icon-button" aria-label="Undo Changes">
          <MdUndo />
        </button>
        <button disabled className="icon-button" aria-label="Redo Changes">
          <MdRedo />
        </button>
      </div>
      <div className="button-list">
        <button className="icon-button" aria-label="Code">
          <MdCode />
        </button>
        <button className="icon-button" aria-label="Preview">
          <MdVisibility />
        </button>
        <button
          className="icon-button active"
          aria-label="Split View"
          style={{
            transform: "rotateZ(90deg)",
          }}
        >
          <MdSplitscreen />
        </button>
      </div>
      <div className="button-list">
        <button
          className="icon-button"
          aria-label="Split View"
          style={{
            transform: "rotateZ(90deg)",
          }}
        >
          <MdMoreVert />
        </button>
      </div>
    </div>
  );
};

export default DocToolbar;
