import ReactMarkdown from "react-markdown";
import "github-markdown-css/github-markdown-dark.css";
import "./doc-preview.scss";

type Props = {
  doc: string;
};
const DocPreview = (props: Props) => {
  const { doc } = props;
  return (
    <div className="doc-preview">
      <ReactMarkdown className="markdown-body">{doc}</ReactMarkdown>
    </div>
  );
};

export default DocPreview;
