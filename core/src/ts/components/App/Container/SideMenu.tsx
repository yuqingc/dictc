// Copyright 2018 Matt<mr.chenyuqing@live.com>

import { Icon, Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { withRouter, RouteComponentProps } from 'react-router';

const SubMenu = Menu.SubMenu;

interface ISideMenuConfig {
  name: string;
  path: string;
  icon: string;
  children?: ISideMenuConfig[];
  isEncrypted?: boolean,
}

const SideMenuConfig: ISideMenuConfig[] = [
  {
    name: 'Home',
    path: '/',
    icon: 'home',
  },
  {
    name: 'Blogs',
    path: '/blogs',
    icon: 'rocket',
    children: [
      {
        name: 'Originals',
        path: '/blogs/originals',
        icon: 'code-o',
      },
      {
        name: 'Favorites',
        path: '/blogs/favorites',
        icon: 'star-o',
      }
    ]
  },
  {
    name: 'Downloads',
    path: '/downloads',
    icon: 'download',
    children: [
      {
        name: 'Books',
        path: '/downloads/books',
        icon: 'book',
      },
      {
        name: 'Files',
        path: '/downloads/files',
        icon: 'folder',
      }
    ]
  },
  {
    name: 'Messages',
    path: '/messages',
    icon: 'message',
  },
  {
    name: 'Encrypted',
    path: '/encrypted',
    icon: 'lock',
    isEncrypted: true,
  },
];

interface ISideMenuProps extends RouteComponentProps<ISideMenuProps> {
}

class SideMenu extends React.Component<ISideMenuProps, {}> {

  private handleClick = (e: ClickParam) => {
    // const { history, onChangeMenu } = this.props;
    // history.replace(e.key);
    // onChangeMenu && onChangeMenu(e.key);
    console.log('change menu', e);
  }

  // tslint:disable-next-line:member-ordering
  public render () {

    return (
      <Menu
        theme="dark"
        onClick={this.handleClick}
        defaultSelectedKeys={['Home']}
        mode="inline"
        selectedKeys={['1']}
      >
        <Menu.Item key="1">Component</Menu.Item>
        <Menu.Item key="2">Component</Menu.Item>
        <Menu.Item key="3">Component</Menu.Item>
        <Menu.Item key="4">Component</Menu.Item>
        <Menu.Item key="5">Component</Menu.Item>
        <Menu.Item key="6">Component</Menu.Item>
        <SubMenu title="Title" key="7">
          <Menu.Item key="8a">Component</Menu.Item>
          <Menu.Item key="8b">Component</Menu.Item>
          <Menu.Item key="8c">Component</Menu.Item>
          <Menu.Item key="8d">Component</Menu.Item>
          <Menu.Item key="8e">Component</Menu.Item>
          <Menu.Item key="8f">Component</Menu.Item>
        </SubMenu>
        <Menu.Item key="8">Component</Menu.Item>
        <Menu.Item key="9">Component</Menu.Item>
        <SubMenu title="Title2" key="55">
          <Menu.Item key="82a">Component</Menu.Item>
          <Menu.Item key="82b">Component</Menu.Item>
          <SubMenu title="Haha">
            <Menu.Item key="842a">Component</Menu.Item>
            <Menu.Item key="842b">Component</Menu.Item>
          </SubMenu>
          <Menu.Item key="82d">Component</Menu.Item>
          <Menu.Item key="82e">Component</Menu.Item>
          <Menu.Item key="82f">Component</Menu.Item>
        </SubMenu>
        <Menu.Item key="10">Component</Menu.Item>
        <Menu.Item key="11">Component</Menu.Item>
        <Menu.Item key="12">Component</Menu.Item>
        <Menu.Item key="13">Component</Menu.Item>
        <Menu.Item key="14">Component</Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(SideMenu);
