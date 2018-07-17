import { Tooltip } from 'antd';
import ReactMarkdown from 'react-markdown';
import * as _Prism from 'prismjs';

declare const Prism: typeof _Prism;

interface ICodeExampleProps {
  title: string;
  component: JSX.Element;
  sourceCode: string;
  language?: string;
}

interface ICodeExampleState {
  showSource: boolean;
}

class CodeExample extends React.Component<ICodeExampleProps, ICodeExampleState> {
  constructor (props: any) {
    super(props);
    this.state = {
      showSource: false,
    };
  }
  private getCodeStringOfMd = (source: string, language: string = 'tsx') =>
    `\n\`\`\`${language}\n${source}\n\`\`\`\n`
  private toggleSource = () => {
    this.setState(state => ({
      showSource: !state.showSource
    }), () => Prism.highlightAll());
  }
  public render () {
    const { showSource } = this.state;
    const { title, component, sourceCode, language } = this.props;
    console.log('source is', this.getCodeStringOfMd(sourceCode, language));

    return (
      <div className="dictc-code-example-container">
        <div className="dictc-code-example-title">{title}</div>
        <div className="dictc-code-example-component">
          {component}
          <Tooltip title={showSource ? 'Hide code' : 'Show code'}>
            <div
              className="toggle-source-btn"
              onClick={this.toggleSource}
            >
              {showSource ? '</>' : '< >'}
            </div>
          </Tooltip>
        </div>
        {
          showSource &&
          <ReactMarkdown
            className="markdown-body"
            source={this.getCodeStringOfMd(sourceCode, language)}
          />
        }
      </div>
    );
  }

}

export default CodeExample;
