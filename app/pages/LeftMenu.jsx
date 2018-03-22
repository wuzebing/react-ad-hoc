import React, {
  Component
} from 'react';
import {
  Link
} from 'react-router-dom';
import {
  connect
} from 'react-redux';
import {
  toActive
} from '../actions';
import axios from 'axios';
import {
  moduleUrl
} from '../utils/interfaceUrl';

class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuone: [],
      index: -1
    }

  }

  componentWillMount() {}

  toActive(index) {
    this.setState({
      index: index
    });

  }
  render() {

    return (
      <aside>
          <dl>
              <dt>发布中心</dt>
              <dd> 
                <i className="fa fa-circle"></i>
                <Link  to="/two">t</Link>
              </dd>
          </dl>
       
        </aside>
    )
  }
}
export default LeftMenu;