import React, {
  Component
} from 'react';
import {
  Route,
  Link
} from 'react-router-dom'

import Example from './Example'
import PageTwo from './PageTwo'

import Atm from './search/Atm'

import axios from "axios";
import {
  reportUrl
} from '../utils/interfaceUrl'

/*
 * @class `右侧内容`
 */
class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentWillMount() {

  }

  render() {
    return (
      <article>
          <Route exact path="/" component={Example}/>
          <Route exact path="/two" component={PageTwo}/>
          <Route exact path="/atm" component={Atm}/>
      </article>
    );
  }
}
export default MainContent;

let MainContentStyle = {
  backgroundColor: "#eee",
  height: "200px",
  overflow: "hidden"
}