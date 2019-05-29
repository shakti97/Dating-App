import React, { Component } from "react";
import Header from "../../Components/Header/Header";
import {Switch, Route} from 'react-router-dom';
import Home from "../../Components/Home/Home";
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/dashboard/:email" exact component={Home} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Main;
