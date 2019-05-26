import React, { Component } from "react";
import { ApiUrl } from "../../globalConst/globalConstFile";
import Axios from 'axios';
import './Register.css'; 
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      password: "",
      imageUrl : ""
    };
  }
  handleChange=(event)=>{
    event.preventDefault();
    this.setState({
      [event.target.name] : event.target.value
    })
  }
  uploadImage=(event)=>{
    event.preventDefault();
    this.setState({
      submit : true
    })
    const fileData = new FormData();
    console.log(event.target.files[0]);
    console.log(event.target.files[0].name);
    fileData.append('image',event.target.files[0],event.target.files[0].name)
    Axios.post(ApiUrl.Api+"/uploadImage",fileData).then(response=>{
      console.log(response.data.imageUrl);
      this.setState({
        imageUrl : response.data.imageUrl
      },()=>{
        console.log(this.state);
        this.setState({
          submit : false
        })
      })
    }).catch(error=>{
      console.log(error.response);
      this.setState({
        submit : false
      })
    })
  }
  register=(event)=>{
    event.preventDefault();
    this.setState({
      submit : true
    })
    let requestBody={
      name : this.state.userName,
      email : this.state.email,
      password : this.state.password,
      imageUrl : this.state.imageUrl
    }
    Axios.post(ApiUrl.Api+"/register",requestBody).then(response=>{
      console.log(response);
      if(response.data.isSignUp){
        this.setState({
          submit : false
        },()=>{
          this.props.history.push('/login');
        })
      }
    }).catch(error=>{
      console.log(error.response);
      this.setState({
        submit : false
      })
    })
  }
  render() {
    return (
      <React.Fragment>
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
        <div className="row register">
          <form onSubmit={this.register} className='form-register'>
            <div className="form-title">
              Register
            </div>
            <div className="row form-group">
              <div className="col-md-12">
                <input
                  type="text"
                  className="form-control"
                  name="userName"
                  onChange={this.handleChange}
                  placeholder="User Name"
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-md-6">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={this.handleChange}
                  placeholder="User Email"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={this.handleChange}
                  placeholder="password"
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-md-12">
                <input
                  type="file"
                  className="form-control"
                  name="image"
                  onChange={this.uploadImage}
                />
              </div>
            </div>
            <div className="form-group">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
        </LoadingOverlay>
      </React.Fragment>
    );
  }
}

export default Register;
