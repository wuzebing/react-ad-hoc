import React , { Component } from 'react';
import PropTypes from 'prop-types';
import {Link } from 'react-router-dom';


class waitingVefifyTable extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  wkindOfDialog(dialog, obj) {  
    if(dialog ==="申请发布"){
       this.props.handlerClick({
        dialogType: 'onlineVerify',
        applicationId: obj
      })

    }else if(dialog !== 'reportDetailDialog'){
      this.props.handlerClick({
      dialogType: "applyPublic",
      applicationId: obj
    }); 

    }
   
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
    let { tablelist } = this.props;
    return(
      <table>
              <thead>
                <tr>
                  <th>序号</th>
                  <th>报表UUID</th>
                <th>报表名称</th>
                <th>报表来源</th>
                <th>审核类型</th>
                <th>申请时间</th>
                <th>申请人</th>
                <th>审核状态</th>
                <th>操作</th>
                </tr>
              </thead>
              <tbody>
              {
              this.props.tablelist.map((obj,index) => {
                   return <tr key={index}>
                <td>{ index + 1 }</td>
                <td>{ obj.reportUuid }</td>
                <td>{obj.reportName}</td>
                <td>{obj.reportSource}</td>
                <td>{obj.applicationType}</td>
                <td>{obj.createDate}</td>
                <td>{obj.createUserName }</td>
                <td>{obj.status}</td>
                <td>
                  <div className="opres">
                    <a href="javascript:void(0)" onClick={()=>{  return this.wkindOfDialog(obj.applicationType, obj.applicationId)}}>审核</a>
                    <Link  to={obj.applicationType === '申请发布' 
                      ? "/reportDetail?sourceReportId="+ obj.sourceReportId + '&reportSource=' + obj.reportSource
                      :"/verifyingDetail?sourceReportId=" + obj.sourceReportId + '&reportSource=' + obj.reportSource + '&version=' + obj.version  }>报表详情</Link>
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


export default waitingVefifyTable;


