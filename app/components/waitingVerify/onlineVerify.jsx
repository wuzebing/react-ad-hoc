import React, {
	Component
} from 'react';
import axios from 'axios';
import { Popconfirm, message, Button, Icon } from 'antd';
const text = '您确定要拒绝吗?';
import {
  refuseUrl,
	onlineUrl,
  verifyDetailUrl
} from '../../utils/interfaceUrl';

class onlineDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectOfflineList: [],
           showApplyDialog: true,
           dialogClass: 'detail_pass_dialog',
           applicationDesc: '', 
           verifyingDetail: {}, 
           applyMenuList: [],
           errorTips: false,
		}
		this.closeDialog = this.closeDialog.bind(this);
    this.applicationDescrible = this.applicationDescrible.bind(this);
    this.verifyed  = this.verifyed.bind(this);
    this.refuse = this.refuse.bind(this);
    // this.offlineApplication = this.offlineApplication.bind(this);
	}
    applicationDescrible(e){
    let val = e.target.value;
    if(!val){
      this.setState({
        errorTips: true,
        applicationDesc: val 
      })
      return;
    }
    this.setState({
      applicationDesc: val 
    })
  }
  refuse(){
      if(!this.state.applicationDesc){
      message.warning('未填写备注信息');
      this.setState({
        errorTips: true
      })
      return
    }
         axios.post(refuseUrl,{
      applicationDesc: this.state.applicationDesc,
      applicationId: this.props.applicationId
    
    }).then(response =>{
       
      if(response.data.success){
        this.props.refreshPage()
       
      }else{
        message.error(response.data.errorMsg);
      }

    }).catch(error => {
      console.log(error)
    })

  }
  verifyed(){
      if(!this.state.applicationDesc){
      message.warning('未填写备注信息');
      this.setState({
        errorTips: true
      })
      return
    }
     axios.post(onlineUrl,{
      applicationDesc: this.state.applicationDesc,
      applicationId: this.props.applicationId
    
    }).then(response =>{
       
      if(response.data.success){
        message.success('提交成功'); 
        this.props.refreshPage()  
      }else{
        message.error(response.data.errorMsg);
      }
    }).catch(error => {
      console.log(error)
      message.error('提交失败');

    })
  }
 
	closeDialog () {

      this.props.handlerCloseClick('isCloseDialog')
	  	
	}
  componentWillMount(){
     axios.get(verifyDetailUrl,{
        params: {
          applicationId: this.props.applicationId
        }
      }).then((response) => {
        if(response.data.success){
          this.setState({
            verifyingDetail: response.data.data,
            applyMenuList: response.data.data.menus,

          })
        }else {
          message.error(response.data.errorMsg);
        }

         }).catch((error) => {
          
        console.log(error)
      })
  }
	render() {
		return (
		<div className={!this.props.isFlag && this.state.showApplyDialog ? "masking" :'showDialogFlag' }>
     	<div  className={!this.props.isFlag  && this.state.showApplyDialog ?  "common-dialog " + this.state.dialogClass : 'showDialogFlag'}>
      <Icon type="close" className="close" onClick={this.closeDialog}/>
     <h1 className="dialog-title">审核-发布申请</h1>
     <div className="scrollBar">
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
            <label >申请备注</label>
            <span>{this.state.verifyingDetail.applicationDesc}</span>
          </p>
          <div className="pubDetail">
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
        <div className="remark-item">
          <h4>审批备注</h4>
           <textarea name="" id="" cols="30" rows="5" placeholder="请输入备注信息" className="remark" value= { this.state.applicationDesc }onChange={this.applicationDescrible}></textarea>     
              <em className={!this.state.applicationDesc && this.state.errorTips  ? "errorTip": "deleteError"}>请输入备注信息</em>
     </div>
       </div>    
     <div className="btn">
       <Popconfirm placement="topRight" title={text} onConfirm={this.refuse} okText="确定" cancelText="取消">
        <Button>拒绝</Button>
      </Popconfirm>
       <button className="default-btn" onClick={this.verifyed}>确定上线</button>
     </div>
   </div>
   </div>
		)
	}
}

export default onlineDialog



