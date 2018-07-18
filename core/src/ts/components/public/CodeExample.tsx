import { Tooltip } from 'antd';
import ReactMarkdown from 'react-markdown';
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
} from 'react-live';

interface ICodeExampleProps {
  title: string;
  scope?: {[index: string]: any};
  sourceCode: string;
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
    }));
  }
  public render () {
    const { showSource } = this.state;
    const { title, sourceCode, scope } = this.props;

    return (
      <LiveProvider code={sourceCode} scope={scope}>
        <div className="dictc-code-example-container">
          <div className="dictc-code-example-title">{title}</div>
          <div className="dictc-code-example-component">
            <LiveError />
            <LivePreview />
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
            <LiveEditor className="dictc-code-example-source" />
          }
        </div>
      </LiveProvider>
    );
  }

}

export default CodeExample;
