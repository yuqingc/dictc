import { Layout, Input, BackTop } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router';

import SideMenu from './SideMenu';

// mock data
import FakeContent from 'ts/components/mock/FakeContent';

const { Footer, Sider, Content } = Layout;
const { Search } = Input;

interface IContainerProps extends RouteComponentProps<IContainerProps> {
  children: React.ReactElement<any> | React.ReactElement<any>[];
}

interface IContainerState {
  collapsed: boolean,
  hasError: boolean,
}

class Container extends React.Component<IContainerProps, IContainerState> {
  constructor (props: any) {
    super(props);
    this.state = {
      collapsed: false,
      hasError: false,
    };
  }

  public componentDidCatch (error: any, info: any) {
    if (process.env.NODE_ENV == 'development') {
      console.error('error caught from child element tree:', error);
      console.info('info got in `componentDidCatch`', info);
    }
    this.setState({hasError: true});
  }

  // recover from crashed page on route changing
  private onChangeMenu = (key: string) => {
    this.setState({hasError: false});
  }

  public render () {
    const ERROR_MESSAGE: string = 'Oops... Something went wrong in this page. Try switching to other tabs in the left menu.';

    return (
      <Layout className="dictc-layout">
        <Sider className="dictc-sider">
          <div className="dictc-sider-header">
            <h1 className="dictc-sider-title">Your Title</h1>
            <Search
              placeholder="Search API"
              onChange={e => console.log(e.target.value)}
              style={{ width: 180 }}
            />
          </div>
          <SideMenu />
        </Sider>
        <Layout className="dictc-right-layout">
          <Content className="dictc-content">
            <div className="content-paper">
              <BackTop />
              <FakeContent />
              <br />
              Really
              <br />...<br />...<br />...<br />
              long
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />
              content
            </div>
          </Content>
          <Footer className="dictc-footer">User defined footer text can be placed at here</Footer>
        </Layout>
      </Layout>
    );
  }
}

// If you don't wrap Container with `withRouter`, router render will not work due to the connect function.
export default withRouter(Container);
