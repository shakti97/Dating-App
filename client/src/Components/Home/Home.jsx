import React, { Component } from "react";
import Axios from "axios";
import { ApiUrl } from "../../globalConst/globalConstFile";
import UserCard from "../UserCard/UserCard";
import "./Home.css";
import openSocket from "socket.io-client";
import Modal from "../../Container/Main/Modal/Modal";

var socket;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      socket: "",
      showModal: false,
      modalData: "",
      blockedUserArray: []
    };
  }
  hideModal = () => {
    this.setState({
      showModal: false
    });
  };
  componentWillMount() {
    // console.log(socket.id);
    console.log("component Will Mount");
  }
  // async conSocket() {
  //   socket = await openSocket("http://localhost:8080");
  //   return socket;
  // }
  componentDidMount() {
    socket=openSocket("http://localhost:8080");
    socket.on("connection", () => {
      console.log(socket.id);
      socket.emit("login", {
        socketId: socket.id,
        email: this.props.match.params.email
      });
      console.log("getUsers ", localStorage.getItem("authToken"));
      socket.on("liked", data => {
        this.setState({
          showModal: true,
          modalData: data
        });
      });
      socket.on("superLiked", data => {
        console.log("superLiked");
        this.setState({
          showModal: true,
          modalData: data
        });
      });
      socket.on("blocked", data => {
        console.log("blocked aya", data);
        this.getBlockedUser();
      });
    });
    Axios.get(ApiUrl.Api + "/getUsers", {
      headers: { authToken: localStorage.getItem("authToken") }
    })
      .then(response => {
        console.log(response);
        this.setState(
          {
            userList: response.data.userList
          },
          () => {
            this.getBlockedUser();
          }
        );
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  getBlockedUser = () => {
    Axios.get(ApiUrl.Api + "/getBlockedUser", {
      headers: { authToken: localStorage.getItem("authToken") }
    })
      .then(response => {
        this.setState(
          {
            blockedUserArray: response.data.blockedArray.blocked
          },
          () => {
            console.log(this.state.blockedUserArray);
            let userList = this.state.userList;
            userList.map(user => {
              if (this.state.blockedUserArray.includes(user.email)) {
                user.visible = false;
              } else {
                user.visible = true;
              }
              return user;
            });
            this.setState(
              {
                userList: userList
              },
              () => {
                console.log("after blocked run ", this.state.userList);
              }
            );
          }
        );
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  Liked = email => {
    socket.emit("liked", {
      currentEmail: this.props.match.params.email,
      targetEmail: email
    });
  };
  SuperLiked = email => {
    socket.emit("superLiked", {
      currentEmail: this.props.match.params.email,
      targetEmail: email
    });
  };
  Blocked = email => {
    console.log("blocked");
    socket.emit("blocked", {
      currentEmail: this.props.match.params.email,
      targetEmail: email
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="card-container">
          {this.state.userList && this.state.userList.length !== 0 ? (
            <div className="user-card">
              {this.state.userList.map(user => {
                return (
                  <UserCard
                    userDetails={user}
                    key={user._id}
                    Liked={this.Liked}
                    SuperLiked={this.SuperLiked}
                    Blocked={this.Blocked}
                  />
                );
              })}
            </div>
          ) : (
            "No Data Available"
          )}
        </div>
        {this.state.showModal && (
          <Modal
            handleClose={this.hideModal}
            show={this.state.showModal}
            modalTitle="Notification"
          >
            <div>
              <div>{this.state.modalData.notificationMessage}</div>
              {this.state.modalData.imageUrl && (
                <div>
                  <img
                    src={this.state.modalData.imageUrl}
                    height="200"
                    width="200"
                    alt="Liked by User"
                  />
                </div>
              )}
            </div>
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

export default Home;
