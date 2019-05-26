import React from "react";
import "./App.css";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import ComingUpPage from "./Components/ComingUp/ComingUpPage";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import Main from "./Container/Main/Main";
import {Switch,Route,Redirect} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route path="/dashboard" component={Main} />
        <Route path="/register" component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/forgetpassword" exact component={ComingUpPage} />
        <Route path="/*" component={ErrorPage} />
      </Switch>
    </div>
  );
}

export default App;
