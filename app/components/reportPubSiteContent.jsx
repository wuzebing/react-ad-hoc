import React, {
  Component
} from 'react';

import {
  pub_spaceUrl,
  pub_menuUrl
} from '../utils/interfaceUrl';

import axios from 'axios';

import { Tabs, Spin, message } from 'antd';
const TabPane = Tabs.TabPane;


class ReportPubsite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportTab: [],
      currentActivePanel: 0,
      panelList: [],
      currentKey: 1,
      menuName: [],
      menuId: [],
      site: {},
      showMenu: 'firstMenu',
      activeKey:"0",
      firstMenu: 'firstMenu',
      twoMenu: 'twoMenu',
      isLoading: ''

    }
    this.toPrevStep = this.toPrevStep.bind(this);
    this.addReportData = this.addReportData.bind(this);
    this.changeActiveKey = this.changeActiveKey.bind(this);


    // this.ChangeTab = this.ChangeTab.bind(this);

  }

  changeTab(index, id) {
    // let panelList = JSON.parse(localStorage.getItem('panelList' + index));
    this.setState({
      isLoading: false
    })
    // if (panelList) {
    //   this.setState({
    //     currentActivePanel: index,
    //     panelList: panelList,
    //     site: this.state.reportTab[index]
    //       },()=>{
    //         this.setState({
    //           isLoading: true
    //         })
    //       })
    // } else {
      axios.get(pub_menuUrl, {
        params: {
          site_id: id
        }
      }).then(response => {
        if (response.data.success) {
          if(!response.data.data.length){
            this.setState({
              panelList: [],
              isLoading: true
            },() => {
             message.success("无数据");
            })
            return
          }
          // localStorage.setItem('panelList' + index, JSON.stringify(response.data.data))
          this.setState({
            currentActivePanel: index,
            panelList: response.data.data,
            site: this.state.reportTab[index],
            isLoading: true, 
          })
        }else {
          message.error(response.data.errorMsg)
          this.setState({
            currentActivePanel: index,
            panelList: [],
            isLoading: true,
          })
        }
      }).catch((error) =>{
        this.setState({
          isLoading: true
        })
      })

    // }
  }

  panelSelect(e, id, name, Menu) {
    switch(Menu){
      case 'firstMenu':
        if(!this.state.showMenu){
          this.setState({
            showMenu: 'firstMenu'
          })
        }else{
          this.setState({
            showMenu: ''
          })
        } break;
    }
    let choosedsubmitPub = this.props.choosedsubmitPub;
    choosedsubmitPub.forEach((obj, index) => {
      if(obj.menuId == id) {
        message.error('该路径已添加');
        return;
      }
    })

      this.setState({
        currentKey: id,
        menuId: id,
        menuName: name
      })
    
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();

  }
  toPrevStep() {
    this.props.handlerAddReportDetail({
      dialogClass: 'dialog-apply'
    })
  }
  addReportData() {
    this.props.handlerAddReportDetail({
      dialogClass: 'dialog-apply',
      site: this.state.site,
      menuId: this.state.menuId,
      menuName: this.state.menuName
     
    })
  }
  changeActiveKey(activeKey){
    this.setState({activeKey},()=>{
      this.changeTab(activeKey, this.state.reportTab[activeKey].id);
    })
  }
  componentWillMount() {
    axios.get(pub_spaceUrl).then((response) => {
      if (response.data.success) {
        this.setState({
          reportTab: response.data.data
        })
        this.changeTab(0, response.data.data[0].id)
      }else{
        message.error(response.data.errorMsg);
      }
    })
  }
   
  render() {
    return (
      <div>
          <div className='spin-loading' style={!this.state.isLoading ? {} : {display: 'none' }}>
            <Spin spinning={true} size="large" delay={3000} />
          </div>
          <div className="content-box">
          <Tabs
          forceRender={ true }
          defaultActiveKey="0"
          tabPosition='top'
          activeKey={this.state.activeKey}
          style={{ height: 350 }}
          onChange={this.changeActiveKey}> 
           {
                this.state.reportTab.map((obj,index) => {
                  return (
                <TabPane tab={obj.name}  key={index} >
                  <div className="panel-tab">
            <ul className="one-menu">
            {
              this.state.panelList.map((obj, currentindex) => {
                return ( <li key={ obj.id } className={this.state.currentKey === obj.id ? "panel-active" : ""} 
                  onClick={(e)=>this.panelSelect(e,  obj.id, obj.name , 'firstMenu')} >
                <i className={ !this.state.showMenu ? "fa fa-angle-right" :  "fa fa-angle-down" }></i>
                <a href="javascript:void(0)">{ obj.name }</a>
                <ul className="two-menu" style={!this.state.showMenu  ? {display: 'none'} : {display: 'block' }}>
                {
                  obj.children&&obj.children.map((childrenObj, childrenIndex) => {
                    return (       
                      <li  className={this.state.currentKey === childrenObj.id ? "panel-active" : ""} onClick={(e)=>this.panelSelect(e,  childrenObj.id,[obj.name,childrenObj.name], 'twoMenu')} key={ childrenObj.id }>
                    <i></i>
                    <a href="javascript:void(0)">{ childrenObj.name }</a>
                  </li>
                      )
                  })
                }
                </ul>
              </li>
                  )
              })
            }  
            </ul>   
          </div>
                </TabPane>     
                    )
                })
              }
          </Tabs>
              
          
          
        </div>
        <div className="btn">
          <button onClick={this.toPrevStep}>上一步</button>
          <button className="default-btn" onClick={this.addReportData}>确定</button>
        </div>     
    </div>
    )
  }
}
export default ReportPubsite;