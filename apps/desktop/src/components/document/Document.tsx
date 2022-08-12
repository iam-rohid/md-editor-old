import { useState } from "react";
import { MdEditor } from "../md-editor";
import { MdPreview } from "../md-preview";
import "./document.scss";

const Document = () => {
  const [body, setBody] = useState("# hello wrold");
  return (
    <div
      className="docuemnt"
      style={{
        left: 56 + 260,
        top: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <div className="container editor-only">
        <MdEditor initValue={body} onChange={setBody} />
        <MdPreview doc={body} />
      </div>
    </div>
  );
};

export default Document;
