import React from "react";
import "./App.css";

import axios from "axios";
import loading from "./loading.gif";
import { Route, Switch } from "react-router-dom";

import Homepage from "./Pages/Homepage";
import UserProfilePage from "./Pages/UserProfilePage";
import LoginSignUpPage from "./Pages/LoginSignupPage";
import MyProfilePage from "./Pages/MyProfilePage";
import UploadPage from "./Pages/UploadPage";
import Navibar from "./Components/Navbar";

class App extends React.Component {
  state = {
    users: [],
    isLoading: true,
    currentUser: { loggedIn: false }
  };

  componentDidMount() {
    // performing a GET request
    let user = localStorage.getItem("userData");
    if (user) {
      user = JSON.parse(user);
      this.setState({
        currentUser: { ...user, loggedIn: true }
      });
    }
    axios
      .get("https://insta.nextacademy.com/api/v1/users")
      .then(result => {
        console.log(result);
        // If successful, we do stuffs with 'result'
        this.setState({ users: result.data, isLoading: false });
      })
      .catch(error => {
        // If unsuccessful, we notify users what went wrong
        console.log("ERROR: ", error);
      });
  }

  signUpUser = (username, email, password) => {
    axios
      .post("https://insta.nextacademy.com/api/v1/users/", {
        username: username,
        email: email,
        password: password
      })
      .then(result => {
        let JWT = result.data.auth_token;
        localStorage.setItem("userToken", JWT);
        localStorage.setItem("userData", JSON.stringify(result.data.user));

        this.setState({
          currentUser: { ...result.data.user, loggedIn: true }
        });
      });
  };

  render() {
    if (this.state.isLoading) {
      return <img src={loading} alt="loading" />;
    }
    return (
      <>
        <Navibar />
        <Switch>
          <Route
            exact
            path="/"
            component={() => {
              return <Homepage users={this.state.users} />;
            }}
          />
          <Route
            path="/user/:id"
            users={this.state.users}
            component={props => (
              <UserProfilePage users={this.state.users} {...props} />
            )}
          />
          <Route
            exact
            path="/signup"
            component={() => {
              return <LoginSignUpPage signUpUser={this.signUpUser} />;
            }}
          />
          <Route
            exact
            path="/profile"
            component={() => {
              return <MyProfilePage />;
            }}
          />
          <Route
            exact
            path="/upload"
            component={() => {
              return <UploadPage />;
            }}
          />
        </Switch>
      </>
    );
  }
}

export default App;
