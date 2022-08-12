import { useState } from "react";
import { DocEditor } from "../doc-editor";
import { DocPreview } from "../doc-preview";
import { DocToolbar } from "../doc-toolbar";
import "./document.scss";

const Document = () => {
  const [body, setBody] = useState("# hello wrold");
  return (
    <div
      className="docuemnt"
      style={{
        left: `${4 + 20}rem`,
        top: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <DocToolbar />
      <div className="container split-view">
        <DocEditor initValue={body} onChange={setBody} />
        <DocPreview doc={body} />
      </div>
    </div>
  );
};

export default Document;
