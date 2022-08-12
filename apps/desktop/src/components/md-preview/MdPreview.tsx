import ReactMarkdown from "react-markdown";
import "github-markdown-css/github-markdown-dark.css";
import "./md-preview.scss";

type Props = {
  doc: string;
};
const MdPreview = (props: Props) => {
  const { doc } = props;
  return (
    <div className="md-preview">
      <ReactMarkdown className="markdown-body">{doc}</ReactMarkdown>
    </div>
  );
};

export default MdPreview;
