import React, { Component } from "react";
import Axios from "axios";
import { ApiUrl } from "../../globalConst/globalConstFile";
import UserCard from "../UserCard/UserCard";
import './Home.css';
import openSocket from 'socket.io-client';

const socket=openSocket('http://localhost:8080');
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      socket : ''
    };
  }
  componentWillMount(){
      console.log('component Will Mount');
  }
  componentDidMount() {
    
    console.log('socokwvs ',socket);
    socket.emit('login',{socketId :socket.id  , email : this.props.match.params.email})
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
  Liked=(email)=>{
    socket.emit('liked',{currentEmail : this.props.match.params.email, targetEmail : email})
  }
  SuperLiked=(email)=>{
    socket.emit('superLiked',{currentEmail : this.props.match.params.email, targetEmail : email})
  }
  Blocked=(email)=>{
    socket.emit('blocked',{currentEmail : this.props.match.params.email,targetEmail : email})
  }
  render() {
    return (
      <React.Fragment>
        <div className="card-container">
            {this.state.userList && this.state.userList.length !== 0 ? (
            <div className="user-card">
                {this.state.userList.map(user => {
                return <UserCard userDetails={user} key={user._id} Liked={this.Liked} SuperLiked={this.SuperLiked} Blocked={this.Blocked}/>;
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
