import ReactMarkdown from 'react-markdown';

// For minimun code size, hilight code supports
// the following languages with `prism.js`:
// markup, css, c-like, javascript, jsx
// markdown, yaml, less, sass
// typescript, tsx
// For supporting more languages,
// visit http://prismjs.com
const MarkdownBox = (props: {source: string}) => (
  <div className="dictc-md-wrapper">
    <ReactMarkdown
      className="markdown-body"
      source={props.source}
    />
  </div>
);

export default MarkdownBox;
