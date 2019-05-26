import React, { Component } from "react";
import "./Header.css";
import {withRouter} from 'react-router';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  logout=(event)=>{
    event.preventDefault();
    localStorage.setItem('authToken','');
    this.props.history.push('/login');
  }
  render() {
    return (
      <React.Fragment>
        <div className="header">
          <div className="Container">
            <div className="row">
              <div className="col-md-2">
                <div className="row headerLeft">
                  <div className="col-md-4 message">
                    <i className="fa fa-envelope-open" />
                  </div>
                  <div className="col-md-4 message">
                    <i className="fa fa-envelope" />
                  </div>
                  <div className="col-md-4 message">
                    <i className="fa fa-th-large" />
                  </div>
                </div>
              </div>
              <div className="col-md-8 headerContent">
                <center>
                  <span className="header1">Dating</span>
                  <span className="header2"> App</span>
                </center>
              </div>
              <div className="col-md-2 ">
                <div className="row headerRight">
                  <div className="col-md-4">
                    <i className="fa fa-search" onClick={this.searchBar} />
                  </div>
                  <div
                    className="col-md-4"
                  >
                      <div className="notificationBell">
                        <i className="fa fa-bell" />  
                      </div>
                  </div>
                  <div className="col-md-4 dropdon">
                    <i className="fa fa-user" />
                    <div className="dropdon-content">
                      <ul>
                        <li onClick={this.logout}>Logout</li>
                        <li>Setting</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Header);
