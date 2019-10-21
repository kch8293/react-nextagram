import React from "react";
import { Badge } from "reactstrap";

import SignupForm from "../Containers/SignupForm";
import LoginForm from "../Containers/LoginForm";

class LoginSignupPage extends React.Component {
  state = {
    isLogin: false
  };
  toggleLogin = () => {
    const { isLogin } = this.state;
    this.setState({ isLogin: !isLogin });
  };
  render() {
    return (
      <>
        {this.state.isLogin ? (
          <>
            <h1>Sign Up Page</h1>
            <SignupForm signUpUser={this.props.signUpUser}></SignupForm>
            <Badge color="primary" onClick={this.toggleLogin}>
              Already signed in? Log in now!
            </Badge>
          </>
        ) : (
          <>
            <h1>Log In Page</h1>
            <LoginForm></LoginForm>
            <Badge color="primary" onClick={this.toggleLogin}>
              Don't have an account? Sign up now!
            </Badge>
          </>
        )}
      </>
    );
  }
}

export default LoginSignupPage;
