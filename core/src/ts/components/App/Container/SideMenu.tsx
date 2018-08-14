// Copyright 2018 Matt<mr.chenyuqing@live.com>

import { Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { withRouter, RouteComponentProps } from 'react-router';

import dictcPages from 'ts/out/dictcContent';

const SubMenu = Menu.SubMenu;

interface ISideMenuProps extends RouteComponentProps<ISideMenuProps> {
  theme: 'light' | 'dark';
  filteredName: string;
}

interface ISideMenuState {
  subMenus: JSX.Element[] | null;
  selectedKey: string;
}

class SideMenu extends React.Component<ISideMenuProps, ISideMenuState> {
  constructor (props: any) {
    super(props);
    this.state = {
      subMenus: null,
      selectedKey: '',
    };
  }

  public componentDidMount () {
    const { history } = this.props;
    const fisrtItemName = dictcPages && dictcPages[0] && encodeURI(dictcPages[0].name) || '';
    this.setState({
      // subMenus: this.renderMenus(dictcPages),
      selectedKey: fisrtItemName,
    }, () => {
      history.replace('/' + fisrtItemName);
    });
  }

  private handleClick = (e: ClickParam) => {
    const { history } = this.props;
    // history.replace(e.key);
    // onChangeMenu && onChangeMenu(e.key);
    this.setState({
      selectedKey: e.key
    }, () => {
      const path = e.keyPath.reverse().join('/');
      history.push('/' + path);
    });
  }

  // TODO: add pages type
  private renderMenus = (pages: any[]) => {
    const { filteredName } = this.props;
    function goAll (pages: any[]) {
      const menuArr: JSX.Element[] = [];
      for (const v of pages) {
        if (!v.pages) {
          menuArr.push(<Menu.Item key={encodeURI(v.name)}>{v.name}</Menu.Item>);
        } else {
          menuArr.push(
            <SubMenu key={encodeURI(v.name)} title={v.name}>
              {
                goAll(v.pages)
              }
            </SubMenu>
          );
        }
      }

      return menuArr;
    }

    // If there is a filter from the search text area, run this function
    const menuArr: JSX.Element[] = [];
    function goWithFilter (pages: any[], parentPath: string) {
      for (const v of pages) {
        if (!v.pages && new RegExp(filteredName, 'i').test(v.name)) {
          menuArr.push(<Menu.Item key={parentPath + encodeURI(v.name)}>{v.name}</Menu.Item>);
        } else if (v.pages) {
          goWithFilter(v.pages, v.name + '/');
        }
      }
    }

    if (filteredName) {
      goWithFilter(pages, '');

      return menuArr;
    }

    return goAll(pages);
  }

  public render () {
    const { theme } = this.props;
    const { subMenus, selectedKey } = this.state;

    return (
      <Menu
        theme={theme}
        onClick={this.handleClick}
        mode="inline"
        selectedKeys={[selectedKey]}
      >
        {
          this.renderMenus(dictcPages)
        }
      </Menu>
    );
  }
}

export default withRouter(SideMenu);
