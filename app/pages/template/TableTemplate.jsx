import React, {
  Component
} from 'react';
import { Table } from 'antd';


const columns = [{
  title: '姓名',
  dataIndex: 'name'
}, {
  title: '年龄',
  dataIndex: 'age'
}, {
  title: '住址',
  dataIndex: 'address'
}];
const data = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}, {
  key: '3',
  name: '李大嘴',
  age: 32,
  address: '西湖区湖底公园1号'
}];


// ------头部部分------
class TableTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {}

  render() {
    return (
      <div className="table-template">
        <p className="tip-con">执行时间：<span>1.1231秒</span></p>
        <p className="tip-con">SQL语句：<span>select * from user where 1=1</span></p>
        <Table columns={columns} dataSource={data} size="small" />
      </div>
    )
  }
}
export default TableTemplate;