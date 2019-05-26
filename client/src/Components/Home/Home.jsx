import React, { Component } from "react";
import Axios from "axios";
import { ApiUrl } from "../../globalConst/globalConstFile";
import UserCard from "../UserCard/UserCard";
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: []
    };
  }
  componentDidMount() {
    console.log("getUsers ", localStorage.getItem("authToken"));
    Axios.get(ApiUrl.Api + "/getUsers", {
      headers: { authToken: localStorage.getItem("authToken") }
    })
      .then(response => {
        console.log(response);
        this.setState({
          userList: response.data.userList
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  render() {
    return (
      <React.Fragment>
        <div className="card-container">
            {this.state.userList.length !== 0 ? (
            <div className="user-card">
                {this.state.userList.map(user => {
                return <UserCard userDetails={user} key={user._id}/>;
                })}
            </div>
            ) : (
            "No Data Available"
            )}
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
