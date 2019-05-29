import React, { Component } from "react";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import {Link} from 'react-router-dom';
import './Login.css';
import { ApiUrl } from "../../globalConst/globalConstFile";
import Axios from 'axios';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email : '',
      password : '',
      submit : false
    };
  }
  handleChange=(event)=>{
    event.preventDefault();
    this.setState({
      [event.target.name] : event.target.value
    },()=>{
      console.log(this.state);
    })
  }
  login=(event)=>{
    event.preventDefault();
    this.setState({
      submit : true
    })
    var requestBody={
      email : this.state.email,
      password : this.state.password
    } 
    Axios.post(ApiUrl.Api+"/login",requestBody)
    .then(response=>{
      localStorage.setItem('authToken',response.data.token)
      this.setState({
        submit : false,
      },()=>{
        console.log(this.state);
      })
      this.props.history.push('/dashboard/'+this.state.email);

    }).catch(error=>{
      console.log(error.response);
      this.setState({
        submit : false 
      })
    })
  }
  render() {
    return (
      <LoadingOverlay
        active={this.state.submit}
        spinner={<BounceLoader />}
        styles={{
          overlay: base => ({
            ...base,
            background: "rgba(237, 247, 248, 0.3)"
          })
        }}
      >
        <React.Fragment>
          <div className="loginWrapper row" id="loginWrapper">
            <div className="col-md-7 loginImage">
              <div className="right loginImageText">
                Login to the Application
              </div>
            </div>
            <div className="col-md-5 loginForm">
              <form
                className="form-signin"
                onSubmit={this.login}
              >
                <div className="loginHeading">
                  <i className="fa fa-user-circle loginIcon" />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="loginUserName"
                    className="form-control loginInputBox"
                    name="email"
                    required
                    onChange={this.handleChange}
                    placeholder="Email Address"
                    value={this.state.userName}
                  />
                  {/* {this.state.ValidationFailure.includes("userName") && (
                    <div className="redColor">User Name Is Incorrect</div>
                  )} */}
                  {/* {this.state.clientSideValidation.includes("userName") && (
                    <div className="redColor">Enter Valid User Name</div>
                  )} */}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    id="loginPassword"
                    required
                    className="form-control loginInputBox"
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    placeholder="Password"
                  />
                  {/* {this.state.ValidationFailure.includes("password") && (
                    <div className="redColor validationFail">
                      Password Is Incorrect!
                    </div>
                  )}
                  {this.state.clientSideValidation.includes("password") && (
                    <div className="redColor validationFail">
                      Password Must Contain 8 Character
                    </div>
                  )} */}
                </div>
                <div className="loginSubmit">
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary"
                    id="loginSubmit"
                  >
                    Login
                  </button>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-12">
                    <div>
                      <Link to="/forgetpassword">
                        <span>Forget Password</span>
                      </Link>
                    </div>
                    <div>
                      <Link to="/register">
                        <span>Register Here</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </React.Fragment>
      </LoadingOverlay>
    );
  }
}

export default Login;
