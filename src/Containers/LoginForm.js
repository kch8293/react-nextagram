import React from "react";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

class LoginForm extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.loginUser(username, password);
  };

  loginUser = (username, password) => {
    axios
      .post("https://insta.nextacademy.com/api/v1/login", {
        username: username,
        password: password
      })
      .then(result => {
        let JWT = result.data.auth_token;
        console.log(JWT);
        localStorage.setItem("userToken", JWT);
        localStorage.setItem("userData", JSON.stringify(result.data.user));
      })
      .catch(error => {
        // If unsuccessful, we notify users what went wrong
        console.log("ERROR: ", error.response);
      });
  };

  render() {
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            name="username"
            placeholder="Insert name here"
            onChange={e => {
              this.handleChange(e);
            }}
          />
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Insert password here"
            onChange={e => {
              this.handleChange(e);
            }}
          />
          <Button color="primary">Log In</Button>
        </FormGroup>
      </Form>
    );
  }
}

export default LoginForm;
