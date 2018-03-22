import React, { Component } from 'react';
import {
  Icon,
  Button,
  Input
} from 'antd';

class DBtree extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render(){
    return (
      <div className="dbtree">
        <ul className="dbtree-first">
          <li className="dbtree-first-li">
            <a className="dbtree-first-span"><i className="fa fa-database"></i>bi_new</a>
            <ul className="dbtree-second-ul">
              <li className="dbtree-second-li"><Input placeholder="快速查询表" size="small" /></li>
              <li className="dbtree-second-li">
                <a className="dbtree-second-span"><i className="fa fa-table"></i>source_dimension</a>
                <ul className="dbtree-third-ul">
                  <li className="dbtree-third-li">
                    <a className="dbtree-third-span">样本数据</a>
                  </li>
                  <li className="dbtree-third-li">
                    <a className="dbtree-third-span"><i className="fa fa-folder-o"></i>数据列</a>
                    <ul className="dbtree-fourth-ul">
                      <li className="dbtree-fourth-li"><a className="dbtree-label">namenamenamenamenamename</a></li>
                      <li className="dbtree-fourth-li"><a className="dbtree-label">name</a></li>
                      <li className="dbtree-fourth-li"><a className="dbtree-label">name</a></li>
                      <li className="dbtree-fourth-li"><a className="dbtree-label">name</a></li>
                      <li className="dbtree-fourth-li"><a className="dbtree-label">name</a></li>
                    </ul>
                  </li>
                  <li className="dbtree-third-li">
                    <a className="dbtree-third-span"><i className="fa fa-folder-o"></i>分区列</a>
                    <ul className="dbtree-fourth-ul">
                      <li className="dbtree-fourth-li"><a className="dbtree-label">name</a></li>
                      <li className="dbtree-fourth-li"><a className="dbtree-label">name</a></li>
                      <li className="dbtree-fourth-li"><a className="dbtree-label">name</a></li>
                      <li className="dbtree-fourth-li"><a className="dbtree-label">name</a></li>
                      <li className="dbtree-fourth-li"><a className="dbtree-label">name</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
}
export default DBtree;