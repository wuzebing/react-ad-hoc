import React, {
    Component
} from 'react';
import {
    BrowserRouter,
    HashRouter
} from 'react-router-dom'

import {
    Layout
} from 'antd';
const {
    Header,
    Content
} = Layout;

import CHeader from "../pages/CHeader"
import MainContent from "../pages/MainContent"

/*
 * @class App `APP`组件
 */
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
    }
    componentWillMount() {

    }
    render() {
        return (
            <div>
                <HashRouter>
                    <Layout>
                      <Header className="header-out">
                        <CHeader />
                      </Header>
                      <Content className="content-out">
                        <MainContent />
                      </Content>
                    </Layout>
                </HashRouter>
            </div>
        )
    }
}

export default App;