import React, {
  Component
} from 'react';
import {
  Row,
  Col,
  Menu,
  Icon
} from 'antd';
import {Link } from 'react-router-dom';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


// ------头部部分------
class CHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: 'ad-hoc查询',
      current: 'mail'
    }
  }

 handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  componentWillMount() {}

  render() {
    return (
      <div className="cheader">
          <Row>
            <Col span={4} className="logo">Ad-hoc查询</Col>
            <Col span={20}>
              <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
                style={{'borderBottom':0,float:'right',fontSize:"14px"}}
              >
                <Menu.Item key="mail">
                  <Link to="/atm">数据查询</Link>
                </Menu.Item>
                <Menu.Item key="app">
                  <Link to="#" target="_self">数据看板</Link> 
                </Menu.Item>
                <SubMenu title={<span>个人中心</span>}>
                  <MenuItemGroup title="配置">
                    <Menu.Item key="setting:1">已保存查询</Menu.Item>
                    <Menu.Item key="setting:2">查询历史</Menu.Item>
                    <Menu.Item key="setting:3">我的看板</Menu.Item>
                  </MenuItemGroup>
                  <MenuItemGroup title="收藏">
                    <Menu.Item key="setting:3">我的收藏</Menu.Item>
                  </MenuItemGroup>
                </SubMenu>
              </Menu>
            </Col>
          </Row>
        </div>
    )
  }
}
export default CHeader;