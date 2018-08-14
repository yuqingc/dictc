import { Tooltip, Icon, message } from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
} from 'react-live';

interface ICodeExampleProps {
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

  private toggleSource = () => {
    this.setState(state => ({
      showSource: !state.showSource
    }));
  }

  private onCopyCode = () => {
    message.success('Copied!');
  }

  public render () {
    const { showSource } = this.state;
    const { sourceCode, scope } = this.props;

    return (
      <LiveProvider code={sourceCode} scope={scope}>
        <div className="dictc-code-example-container">
          <div className="dictc-code-example-component">
            <LiveError />
            <LivePreview />
            <Tooltip title="Copy code">
              <div className="copy-code-button example-btn">
                <CopyToClipboard text={sourceCode} onCopy={this.onCopyCode}><Icon type="copy" /></CopyToClipboard>
              </div>
            </Tooltip>
            <Tooltip title={showSource ? 'Hide code' : 'Show code'}>
              <div
                className="toggle-source-btn example-btn"
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
