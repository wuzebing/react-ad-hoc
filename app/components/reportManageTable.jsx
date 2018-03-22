import React , { Component } from 'react';
import {Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ReportTable extends Component {
	constructor(props) {
		super(props);
		this.state = {}
    // this.applyPublicDialog = this.applyPublicDialog.bind(this)
	}
  kindOfDialog(dialog, obj) {
    this.props.handlerClick({
      dialogType: dialog,
      reportId: obj
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
                <th>报表来源</th>
                <th>报表创建人</th>
                <th>报表创建时间</th>
                <th>当前版本</th>
                <th className="opre-th">操作</th>
                </tr>
              </thead>
              <tbody>
              {
              tablelist.map((obj,index) => {
              		 return <tr key={index}>
                <td>{ index + 1 }</td>
                <td>{obj.reportUuid }</td>
                <td>{obj.reportName}</td>
                <td>{obj.reportSource}</td>
                <td>{obj.createUserName }</td>
                <td>{obj.createDate}</td>
                <td>{obj.version}</td>
                <td>
                  <div className="opres">
                    <a href="javascript:void(0)" onClick={()=>{return this.kindOfDialog('applyPublic', obj.reportId)}}>申请发布</a>
                    <a href="javascript:void(0)" onClick={()=>{return this.kindOfDialog('offlineReportDialog', obj.reportId)}}>下线报表</a>
                    <Link  to={"/reportDetail?sourceReportId=" + obj.sourceReportId + '&reportSource=' + obj.reportSource }>报表详情</Link>
                    <Link  to={"/PubReportDetail?reportId=" + obj.reportId}>发布详情</Link>
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


export default ReportTable;

