import React, {
	Component
} from 'react';
import axios from 'axios';
import {
	offlineUrl,
  applyPublicUrl
} from '../utils/interfaceUrl';

import { Popconfirm,  Button, message, Checkbox, Icon } from 'antd';
const text = '您确定要下线吗?';

class offlineReportDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectOfflineList: [],
           showApplyDialog: true,
           dialogClass: 'apply-dialog',
           applicationDesc: '',  
           applyMenuList: [],
            submitMenuList: [],
           tipAnimate: false,
           errorTips: false,
		}
		this.closeDialog = this.closeDialog.bind(this);
    this.applicationDescrible = this.applicationDescrible.bind(this);
    this.offlineApplication = this.offlineApplication.bind(this);
	}
  
  chooseOffline(obj, e){
    let checked = e.target.checked;
    if(checked){
       this.setState({
      submitMenuList: [...this.state.submitMenuList, obj]
      })
    }else{
       this.state.submitMenuList.map((offlineObj, index) => {
           if(offlineObj.id === obj.id){
              this.setState({
        submitMenuList: [...this.state.submitMenuList.slice(0, index), ...this.state.submitMenuList.slice(index+1)]
      })
              return 
           }
       })
     

    }
  
   

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
  offlineApplication(){
    if(!this.state.applicationDesc){
      this.setState({
        errorTips: true
      })
      return
    }
    if(!this.state.submitMenuList.length){
      message.warning('请选择下线路径');
      return
    }
       axios.post(offlineUrl,{
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
	closeDialog () {

      this.props.handlerCloseClick('isCloseDialog')
	  	
	}
  componentWillMount(){
     axios.get(applyPublicUrl,{
        params: {
          reportId: this.props.reportId
        }
      }).then((response) => {
        if(response.data.success){
          let result = response.data.data.onlineMenus;
          this.setState({
            applyMenuList: result
          })
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
     <h1 className="dialog-title">下线报表</h1>
     <div className="content">
        <h4 className="small-title">请选择下线的位置</h4>
         <ol className="apply-dialog">
                 {
           this.state.applyMenuList.map((obj,index) => {
              return (
                 <li className="apply-item-list" key={obj.id}>
                 <Checkbox className="adjustCheckboxCss" onChange={ this.chooseOffline.bind(this, obj) }/>
             <ul className="apply-item">
               <li key={+new Date()}>{ obj.siteName }</li>
               {
                obj.menuNamePath.split('>').map((menuName,currentIndex) => {
                  return (<li key={+new Date() + currentIndex}>{ menuName }</li>)
                })
               }
             </ul>
           </li>
                )
           })
         }
         </ol>
         <h4 className="small-title">
           下线备注
         </h4>
         <textarea name="" id="" cols="30" rows="5" placeholder="请输入备注信息" className="remark" value= { this.state.applicationDesc }onChange={this.applicationDescrible}></textarea>
        <div style={{ position: 'relative' }}>
              <em className={!this.state.applicationDesc && this.state.errorTips  ? "errorTip": "deleteError"} style={{bottom: 0,left: '2px',top: '-2px'}}>请输入备注信息</em>
           </div>
     </div>  
     <div className="btn">
       <button onClick={this.closeDialog}>取消</button>
       <Popconfirm placement="topRight" title={text} onConfirm={this.offlineApplication} okText="确定" cancelText="取消">
        <Button className="default-btn sumit-offline-btn">确定</Button>
      </Popconfirm>
     </div>
   </div>
   </div>

		)
	}
}

export default offlineReportDialog