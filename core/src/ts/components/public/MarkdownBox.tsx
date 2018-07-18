import ReactMarkdown from 'react-markdown';

interface IMarkdownBoxProps {
  source: string;
}

const MarkdownBox = (props: IMarkdownBoxProps) => {
  return (
    <div className="dictc-md-wrapper">
        <ReactMarkdown
          className="markdown-body"
          source={props.source}
        />
      </div>
  );
};

export default MarkdownBox;
