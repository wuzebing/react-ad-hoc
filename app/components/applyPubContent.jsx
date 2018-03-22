import React , {Component} from 'react';
import {applyPublicUrl , submitApplyUrl} from '../utils/interfaceUrl';
import axios from 'axios';
import { message, Tag, Icon} from 'antd'


class ApplyPubContent extends Component {
	constructor(props){
		super(props);
		this.state = {
    applicationDesc: '',  
		applyMenuList: [],
    submitMenuList: [],
    tipAnimate: false,
    errorTips: false,
		}
    	this.addReportDetail = this.addReportDetail.bind(this);
    	this.closeDialog = this.closeDialog.bind(this);
      this.applicationDescrible = this.applicationDescrible.bind(this);
      this.submitApplication = this.submitApplication.bind(this);
      this.deleteApplyUrl = this.deleteApplyUrl.bind(this);
	}
  componentWillMount(){
    this.getRequestApply();
  }
  deleteApplyUrl(index){
    let applyMenuList = this.state.applyMenuList
    let submitMenuList = [];
    this.state.submitMenuList.forEach((obj,currentIndex)=>{
      if(obj.menuNamePath !== applyMenuList[index].menuNamePath){
        submitMenuList = [...submitMenuList, obj]
      }
    })

    this.setState({
      submitMenuList: submitMenuList,
      applyMenuList: [...applyMenuList.slice(0, index), ...applyMenuList.slice(index + 1)]
    })
  }
  submitApplication() {
   
    if(!this.state.submitMenuList.length){
      this.setState({
        tipAnimate: true
      })
      return 
    }
    if(!this.state.applicationDesc){
      this.setState({
        errorTips: true
      })
      return
    }
    axios.post(submitApplyUrl,{    
      applicationDesc: this.state.applicationDesc,
      menus: this.state.submitMenuList,
      reportId: this.props.reportId
    
    }).then(response =>{
      if(response.data.success){
        message.success('提交成功');
       this.closeDialog(); 
      }else {
        message.error(response.data.errorMsg);
      }
    }).catch(error => {
      console.log(error)
    })
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
  getRequestApply(){
   
    axios.get(applyPublicUrl,{
        params: {
          reportId: this.props.reportId
        }
      }).then((response) => {
        if(response.data.success){
          let onlineResult = response.data.data.onlineMenus;
          let verifyingResult = response.data.data.waitAuditMenus;
          let result =  [...onlineResult, ...verifyingResult]
          let applyObj = this.props.getApplyContent;
          // if(applyObj){
          // let addedMenuItem = {
          //   siteName: applyObj.site.name,
          //   siteId: applyObj.site.id,
          //   menuId: applyObj.menuId,
          //   menuNamePath: applyObj.menuName.join('>')
          // }
          this.setState({
            submitMenuList: [...this.state.submitMenuList, ...applyObj]
          })

           result = [...result , ...applyObj]

          // }
          this.setState({
            applyMenuList: result
          })
          this.props.controlShowDialog()

        }

         }).catch((error) => {
          this.setState({
            showApplyDialog: true
          })
        console.log(error)
      })
    
  }
	closeDialog(){
		this.props.handlerCloseDialog()
	}
	
	addReportDetail() {
		this.props.handlerAddReportDetail({
			dialogClass: 'dialog-public',
      applyMenuList: this.state.applyMenuList,
      submitMenuList: this.state.submitMenuList
		});
	}
	render() {		
    return (
			<div>
				<div className="content">
        		<h4 className="small-title">发布位置</h4>
          <button className={this.state.tipAnimate ? 'tipAnimate' + " addinfo" : 'addinfo' } onClick={this.addReportDetail}><i className="fa fa-plus"></i>添加</button>
         <ol className="apply-dialog">
         {
           this.state.applyMenuList.map((obj,index) => {
              return (
                 <li className="apply-item-list" key={+ new Date() + 'dddd' + index}>
                 <em>{ index + 1 + '.' }</em>
             <ul className="apply-item" key={+new Date() + 'ccc'}>
               <li key={+new Date() + 'bbb'}>{ obj.siteName }</li>
               {
                obj.menuNamePath.split('>').map((menuName,currentIndex) => {
                  return (<li key={+new Date() + currentIndex +'aaaa'}>{ menuName }</li>)
                })
               }
             </ul>
             <Tag color="green" style={ obj.status !== '已上线' ? {display: 'none'} : {}}>{ obj.status }</Tag>
             <Tag color="gold" style={ obj.status !== '待审核' ? {display: 'none'} : {}}> { obj.status }</Tag>
             <Icon type="close"  onClick={ this.deleteApplyUrl.bind(this, index) } style={!obj.status ?{fontSize: '16px',fontWeight: 700, color: '#999'}: {display: 'none'}}></Icon>
           </li>
                )
           })
         }   
         </ol>
         <h4 className="small-title">
           申请备注
           <i style={{fontStyle: 'normal', color: 'red',lineHeight: '30px'}}> * </i>
         </h4>
         <textarea name="" id="" cols="30" rows="5" placeholder="请输入备注信息" className="remark" value= { this.state.applicationDesc } onChange={this.applicationDescrible}></textarea>
         <div style={{ position: 'relative' }}>
              <em className={!this.state.applicationDesc && this.state.errorTips  ? "errorTip": "deleteError"} style={{bottom: 0,left: '2px',top: '-2px'}}>请输入备注信息</em>
           </div>
     </div>      
     <div className="btn">
       <button onClick={this.closeDialog}>取消</button>
       <button className="default-btn" onClick={this.submitApplication} style={!this.state.applicationDesc ? {cursor: 'not-allowed'} : {cursor: 'pointer'}}>提交</button>
     </div>
 </div>
  )
	}
}

export default ApplyPubContent;