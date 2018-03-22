import React, { Component } from 'react';
import {
  Tabs,
  Row,
  Col,
  Menu,
  Icon,
  Button,
  Select,
  Input
} from 'antd';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';  
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint.js'; 

import { Resizable, ResizableBox } from 'react-resizable';

// import 'codemirror/theme/material.css';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import TableTemplate from '../template/TableTemplate'
import DBtree from '../template/DBtree'

/*
 * @class 测试
 */
class Atm extends Component {
	constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      { title: '查询一', content: 'Content of Tab Pane 1', key: '1' },
      { title: '查询二', content: 'Content of Tab Pane 2', key: '2' },
    ];
    const addSearchButton =  <Button size="small" style={{marginRight:"15px"}} onClick={this.add}>新增查询</Button>;

    const resultTabs = [
      { title: '执行日志', content: 'Content of Tab Pane 1', key: '1' },
      { title: '执行历史', content: 'Content of Tab Pane 2', key: '2' },
      { title: '结果1', content: 'Content of Tab Pane 2', key: '2' },
      { title: '结果2', content: 'Content of Tab Pane 2', key: '2' },
      { title: '结果3', content: 'Content of Tab Pane 2', key: '2' }
    ];
    const clearLogButton =  <Button size="small" style={{marginRight:"15px"}} onClick={this.clearLog}>清除日志</Button>;

    this.state = {
      activeKey: panes[0].key,
      panes,
      addSearchButton
    };
  }

  clearLog = () => {

  }

  onChange = (activeKey) => {
    this.setState({ activeKey });
  }
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }
  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
    this.setState({ panes, activeKey });
  }
  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }
  
  //select  change
  databaseChange(){

  }
  render() {
    return (
      <div>
        <div className="atm">
          <ResizableBox className="reasizable-box reasizable-left" width={320} height={440} axis="x">
            <Select showSearch
            style={{width:'100%',fontSize:'12px'}}
              placeholder="请选择库"
              size="small"
              optionFilterProp="children"
              notFoundContent="无法找到"
              searchPlaceholder="输入关键词"
              onChange={this.databaseChange}>
              <Option value="jack">杰克</Option>
              <Option value="lucy">露西</Option>
              <Option value="tom">汤姆</Option>
            </Select>
            <DBtree />
          </ResizableBox>
          <div className="atm-search">
            <Tabs
              hideAdd
              onChange={this.onChange}
              activeKey={this.state.activeKey}
              type="editable-card"
              onEdit={this.onEdit}
              tabBarExtraContent={this.state.addSearchButton}
            >
              {this.state.panes.map(pane => 
                  <TabPane tab={pane.title} key={pane.key}>
                   
                  </TabPane>
                )}
            </Tabs>
            <div className="search-opts">
              <a className="opt-but">格式化</a>
              <a className="opt-but">运行</a>
              <a className="opt-but">提数</a>
              <a className="opt-but">保存模板</a>
              <a className="opt-but">定时执行</a>
              <a className="opt-but">帮助</a>
            </div>
            <div className="search-content">
              <CodeMirror
                value='select * from user'
                options={{
                  mode: 'text/x-mysql',
                    lineNumbers: true,
                    matchBrackets : true,
                    extraKeys: {
                        "Ctrl-/": "autocomplete"
                    },
                    styleActiveLine: true
                }}
                onChange={(editor, data, value) => {
                }}
              />
            </div>
          </div>
        </div>
        <Row className="atm">
          <Col span={16} className="atm-search-result">
            <div className='atm-search-content'>
              <Tabs
                hideAdd
                onChange={this.onChange}
                activeKey={this.state.activeKey}
                type="editable-card"
                onEdit={this.onEdit}
                tabBarExtraContent={this.state.clearLogButton}
              >
                {this.state.panes.map(pane => 
                    <TabPane tab={pane.title} key={pane.key}>
                      <TableTemplate />
                    </TabPane>
                  )}
              </Tabs>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Atm;
