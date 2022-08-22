import { useCallback, useEffect, useState } from "react";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify/lib";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse/lib";
import remarkRehype from "remark-rehype";
import remarkMath from "remark-math";
import { unified } from "unified";
import rehypeHighlight from "rehype-highlight";
import remarkGemoji from "remark-gemoji";
import "rehype-highlight/";
type Props = {
  doc: string;
};

const MdPreview = (props: Props) => {
  const { doc } = props;
  const [md, setMd] = useState("");

  const renderMarkdown = useCallback(async (mdString: string) => {
    const file = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkMath)
      .use(remarkGemoji)
      .use(remarkRehype)
      .use(rehypeSanitize)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(mdString);

    setMd(String(file));
  }, []);

  useEffect(() => {
    renderMarkdown(doc);
  }, [doc, renderMarkdown]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div
        className="prose mx-auto mt-8 mb-64 max-w-3xl px-4 prose-pre:p-0 dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: md }}
      ></div>
    </div>
  );
};

export default MdPreview;
