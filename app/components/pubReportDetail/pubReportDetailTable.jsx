import React , { Component } from 'react';
import PropTypes from 'prop-types';

class PubReportDetailTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  wkindOfDialog(dialog, obj) {
    this.props.handlerClick({
      dialogType: dialog,
      applicationId: obj
    });
  }
  offlineReportDialog() {
    console.log(2)
  }
  reportDetailDialog() {
    console.log(3)
  }
  publicDetailDialog() {
    console.log(4)
  }
  render(){
    let {tablelist} = this.props;
    return(
      <table>
              <thead>
                <tr>
                  <th>序号</th>
                  <th>报表UUID</th>
                <th>报表名称</th>
                <th>发布类型</th>
                <th>当时版本</th>
                <th>申请人</th>
                <th>申请时间</th>
                <th>发布位置</th>
                <th>审核状态</th>
                <th>操作</th>
                </tr>
              </thead>
              <tbody>
              {
              tablelist.map((obj,index) => {
                   return <tr key={index}>
                <td>{ index + 1 }</td>
                <td>{ obj.reportUuid }</td>
                <td>{obj.reportName}</td>
                <td>{obj.applicationType}</td>
                <td>{obj.version }</td>
                <td>{obj.createUserName }</td>
                <td>{obj.createDate}</td>
                <td>{ 
                  obj.menus.map((menu, index) =>{
                    return (<p key={index}>{ menu.siteName + '>' + menu.menuNamePath }</p>)
                  })
                  }</td>
                <td>{obj.status}</td>
                <td>
                  <div className="opres">
                    <a href="javascript:void(0)" onClick={()=>{  return this.wkindOfDialog('PubReportDialog', obj.applicationId)}}>审核详情</a>
                  </div>
                </td>
              </tr>
                })
              }
              </tbody>
            </table>
      )
  }
}
// Example.propTypes = {
//    testpr:PropTypes.arrayof
// };


export default PubReportDetailTable;


