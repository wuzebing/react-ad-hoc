import React, {
	Component
} from 'react';
import axios from 'axios';
import {
 verifyApplicationListUrl,
} from '../../utils/interfaceUrl';
import { Icon } from 'antd';


class PubDetailDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectOfflineList: [],
           showApplyDialog: true,
           dialogClass: 'detail_pass_dialog detail-dialog',
           applicationDesc: '审核', 
           verifyingDetail: {
            auditList: [],
            offlineList: [],
           }, 
           offlineMenuList: [],
           applyMenuList: [],
		}
		this.closeDialog = this.closeDialog.bind(this);
    this.applicationDescrible = this.applicationDescrible.bind(this);
    
	}
    applicationDescrible(e){
    let val = e.target.value;
    this.setState({
      applicationDesc: val 
    })
  }
 
	closeDialog () {

      this.props.handlerCloseClick('isCloseDialog')
	  	
	}
  componentWillMount(){

     axios.get(verifyApplicationListUrl,{
        params: {
          applicationId: this.props.applicationId
        }
      }).then((response) => {
        if(response.data.success){
          let result = response.data.data;


          this.setState({
            verifyingDetail: result,
            applyMenuList: result.menus,
            offlineMenuList: result.offlineList


          })
        }

         }).catch((error) => {
          
        console.log(error)
      })
  }
	render() {
		return (
		<div className={!this.props.isFlag && this.state.showApplyDialog ? "masking" :'showDialogFlag' } >
     	<div  className={!this.props.isFlag  && this.state.showApplyDialog ?  "common-dialog " + this.state.dialogClass : 'showDialogFlag'}>
      <Icon type="close" className="close" onClick={this.closeDialog}/>
     <h1 className="dialog-title">审核详情</h1>
      <div className="scrollBar" style={{ height: '300px'}}>
       {
           this.state.verifyingDetail.offlineList.map((obj, index) =>{
            return ( <div className="item-list" key={index}>
          <h4>下线信息</h4>
           <p>
            <label>下线人</label>
            <span>{obj.opUserName}</span>
          </p>
          <p>
            <label >下线时间</label>
            <span>{obj.opDate}</span>
          </p>
           <div className="pubDetail">
          <h3>下线内容</h3>
          <ol className="apply-dialog">
         {
           obj.menus.map((object,index) => {
              return (
                 <li className="apply-item-list" key={object.id + 'dddd'}>
                 <em>{ index + 1 + '.' }</em>
             <ul className="apply-item" key={+new Date() + 'ccc'}>
               <li key={+new Date() + 'bbb'}>{ object.siteName }</li>
               {
                object.menuNamePath.split('>').map((menuName,currentIndex) => {
                  return (<li key={+new Date() + currentIndex +'aaaa'}>{ menuName }</li>)
                })
               }
             </ul>
           </li>
                )
           })
         }   
         </ol>
          </div>
          <p>
            <label>下线备注</label>
            <span>{ obj.opDesc }</span>
          </p>
        </div>
              )
          })
        }
        <div>
         {
          this.state.verifyingDetail.auditList.map((obj, index) =>{
            return ( <div className="item-list" key={index}>
          <h4>审核信息</h4>
          <p>
            <label >审核状态</label>
            <span>{obj.opResult}</span>
          </p>
          <p>
            <label>审核人</label>
            <span>{obj.opUserName}</span>
          </p>
          <p>
            <label >审核时间</label>
            <span>{obj.opDate}</span>
          </p>
          <p>
            <label>审核备注</label>
            <span>{ obj.opDesc }</span>
          </p>
        </div>
              )
          })
        }
        <div className="item-list">
          <h4>申请信息</h4>
          <p>
            <label >申请人</label>
            <span>{this.state.verifyingDetail.createUserName}</span>
          </p>
          <p>
            <label>申请时间</label>
            <span>{this.state.verifyingDetail.createDate}</span>
          </p>
          <p>
            <label >  { this.state.verifyingDetail.applicationType === "申请发布" ? "申请备注" : "变更详情" }</label>
              <span
                 dangerouslySetInnerHTML={{ __html: this.state.verifyingDetail.applicationDesc }} >
             </span>
          </p>
          <div className="pubDetail" style={this.state.verifyingDetail.applicationType === "申请发布" ? {} : {display: 'none'}}>
          <h3>发布详情</h3>
          <ol className="apply-dialog">
         {
             this.state.applyMenuList.map((obj,index) => {
              return (
                 <li className="apply-item-list" key={obj.id + 'dddd'}>
                 <em>{ index + 1 + '.' }</em>
             <ul className="apply-item" key={+new Date() + 'ccc'}>
               <li key={+new Date() + 'bbb'}>{ obj.siteName }</li>
               {
                obj.menuNamePath.split('>').map((menuName,currentIndex) => {
                  return (<li key={+new Date() + currentIndex +'aaaa'}>{ menuName }</li>)
                })
               }
             </ul>
           </li>
                )
           })
         }   
         </ol>
          </div>
        </div>

        </div>
        </div>
        

   </div>
   </div>
		)
	}
}

export default PubDetailDialog



