import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import './static/css/index.less';
import 'font-awesome/less/font-awesome.less'
import App from './container/App';
import 'antd';
import 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

import './static/css/index.less';
import './static/css/base.css'

moment.locale('zh-cn');


import configureStore from './stores/index';

const store = configureStore();
ReactDOM.render(
 	<Provider store={store}>
		<App />
	</Provider>,
    document.getElementById('root')
);
