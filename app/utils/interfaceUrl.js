// 定义项目中所有的接口名

const contentPath = '/publish' + "/action";
const tmpUrl = '/'

//主页面
export const testUrl = tmpUrl + "announcement/product/hasData";

// 报表来源
export const reportFromUrl = contentPath + '/report/manager/reportSource';

// 创建人
export const creatorUrl = contentPath + '/report/manager/createUser';

// 报表管理

export const reportManageUrl = contentPath + '/report/manager/list';

//申请发布

export const applyPublicUrl = contentPath + '/report/manager/reportDetail';

// 发布空间

export const pub_spaceUrl = contentPath + '/report/manager/site';

// 发布菜单
export const pub_menuUrl = contentPath + '/report/manager/menu';

// 下线

export const offlineUrl = contentPath + '/report/manager/offline';

//提交发布申请
export const submitApplyUrl = contentPath + '/report/manager/apply';



// 发布详情列表
export const pubDetailUrl = contentPath + '/report/application/applicationList';

//审核详情列表

export const verifyApplicationListUrl = contentPath + '/report/application/applicationDetail';



//待审核列表
export const pendingVerifyApplycationListUrl = contentPath + '/report/application/waitAuditList';

// 申请人
export const applicantUrl = contentPath + '/report/application/applyUser';

//审核通过
export const passAudiUrl = contentPath + '/report/application/pass';

// 审核详情
export const verifyDetailUrl = contentPath + '/report/application/applicationDetail';

//确定上线

export const onlineUrl = contentPath + '/report/application/submit';

//拒绝

export const refuseUrl = contentPath + '/report/application/reject';

// 报表详情

export const reportDetailUrl = contentPath + '/report/manager/reportDetail';

//模块列表

export const moduleUrl = contentPath + '/system/menu';


//报表管理 报表详情

export const reportDetailListUrl = contentPath + '/report/manager/biOnlineDetail';

export const verifyDetailListUrl = contentPath + '/report/manager/biDetail';

//获取系统用户名

export const getUserName = contentPath + '/system/user';



//城市top10
// export const carTopListUrl = contentPath + "/action/newCar/dataCompass/queryTopFirstPaymentCarSeries";

//uv查询 （查询时间太慢，单独分离）
// export const uvUrl = contentPath + "/action/newCar/dataCompass/queryUv";