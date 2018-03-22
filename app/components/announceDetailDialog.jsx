import React, {Component} from 'react';
import {applyPublicUrl} from '../utils/interfaceUrl';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {doAddReportDetail} from '../actions';
import { Icon } from 'antd';



// import ApplyPubContent from './ApplyPubContent';
// import ReportPubSiteContent from './ReportPubSiteContent'

class applyPublicDialog extends Component {

	constructor(props){
		super(props);
		this.state = {
      reportApplyOperate: [],
      showApplyDialog: false,
      dialogTitle: '申请发布',
      dialogClass: 'dialog-apply'    
    }
    this.closeDialog = this.closeDialog.bind(this);

		this.changeReportDetail = this.changeReportDetail.bind(this);
	}
  componentWillMount(){
    this.getPublishHository()
  }
  changeReportDialog(){
    if(this.state.dialogClass === 'dialog-apply'){
          return (<ApplyPubContent handlerAddReportDetail={this.changeReportDetail} handlerCloseDialog={ this.closeDialog }/>)
    }else if(this.state.dialogClass === 'dialog-public'){
      return (<ReportPubSiteContent handlerAddReportDetail={this.changeReportDetail}/>)
    }
  }
  getPublishHository(){
      axios.get(applyPublicUrl,{
        params: {
          reportId: this.props.reportId
        }
      }).then((response) => {
        if(response.data.success){
          this.setState({
            showApplyDialog: true
          })
        }

         }).catch((error) => {
          this.setState({
            showApplyDialog: true
          })
        console.log(error)
      })
  }
  closeDialog() {

    this.props.handlerCloseClick('isCloseDialog')

  }
	
  changeReportDetail(obj){
    // this.props.addReportDetail(obj);
    if(obj.dialogClass === 'dialog-public'){
      this.setState({
      dialogTitle: '发布位置',
      dialogClass: obj.dialogClass,
    })
  }else if(obj.dialogClass === 'dialog-apply'){
    this.setState({
      dialogTitle: '申请发布',
      dialogClass: obj.dialogClass
    })
  }
    
    this.changeReportDialog();


  }
	render() {
		return(
				   <div className={!this.props.isFlag && this.state.showApplyDialog ? "masking" :'showDialogFlag' } >
     			<div  className={!this.props.isFlag  && this.state.showApplyDialog ?  "common-dialog " + this.state.dialogClass : 'showDialogFlag'}>
      <Icon type="close" className="close" onClick={this.closeDialog}/>
     			<h1 className="dialog-title">{ this.state.dialogTitle }</h1>
          { this.changeReportDialog() }
   </div>
   </div>
		 )
	}
}
applyPublicDialog.PropsTypes = {
  reportApplyOperate: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    menuNamePath: PropTypes.string.isRequired,
    siteName: PropTypes.string.isRequired
  }).isRequired).isRequired
}



const mapStateToProps = (state) => {
  return {
    reportApplyOperate: state.reportApplyOperate
  }


}
const mapDispatchToProps = (dispatch) => {
  return {
    addReportDetail: (obj) => {
      dispatch(doAddReportDetail(obj));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(applyPublicDialog);







