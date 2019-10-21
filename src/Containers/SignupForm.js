import React from "react";
import axios from "axios";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Button
} from "reactstrap";

class SignupForm extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    usernameValid: false
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, email, password } = this.state;

    this.props.signUpUser(username, email, password);
  };

  handleUsernameChange = e => {
    let x = { ...e };
    let delay = setTimeout(() => this.handleUsernameCheck(x), 300);
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      delay
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleUsernameCheck = e => {
    const newUsername = e.target.value;
    if (newUsername.length >= 6) {
      axios
        .get(
          `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
        )
        .then(response => {
          if (response.data.valid) {
            this.setState({
              usernameValid: true
            });
          } else {
            this.setState({
              usernameValid: false
            });
          }
        })
        .catch(error => {
          // If unsuccessful, we notify users what went wrong
          console.log("ERROR: ", error);
        });
    }
  };

  render() {
    const { username, usernameValid, password, confirmPassword } = this.state;
    console.log(password);
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            name="username"
            placeholder="Insert name here"
            onChange={e => {
              if (this.state.delay) {
                clearTimeout(this.state.delay);
              }
              this.handleUsernameChange(e);
            }}
            {...(username.length >= 6
              ? usernameValid
                ? { valid: true }
                : { invalid: true }
              : username.length > 0
              ? { invalid: true }
              : "")}
          />
          <FormFeedback
            {...(username.length > 0 && username.length >= 6
              ? usernameValid
                ? { valid: true }
                : { invalid: true }
              : { invalid: true })}
          >
            {username.length >= 6
              ? usernameValid
                ? "Sweet, this username is available!"
                : "Sorry, this username is taken!"
              : "Must be minimum 6 characters"}
          </FormFeedback>
          <Label for="email">E-mail</Label>
          <Input
            type="email"
            name="email"
            placeholder="Insert email here"
            onChange={this.handleChange}
          />
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Insert password"
            onChange={this.handleChange}
            {...(password.length === 0
              ? ""
              : password.length >= 6
              ? { valid: true }
              : { invalid: true })}
          />
          <FormFeedback
            {...(password.length === 0 || password.length >= 6
              ? { valid: true }
              : { invalid: true })}
          >
            {password.length === 0 || password.length >= 6
              ? "Good!"
              : "Must be minimum of 6 characters"}
          </FormFeedback>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Re-enter password"
            onChange={this.handleChange}
            {...(confirmPassword.length === 0
              ? ""
              : confirmPassword === password
              ? { valid: true }
              : { invalid: true })}
          />
          <FormFeedback
            {...(confirmPassword.length === 0
              ? ""
              : confirmPassword === password
              ? { valid: true }
              : { invalid: true })}
          >
            {confirmPassword.length === 0
              ? ""
              : confirmPassword === password
              ? "Password confirmed!"
              : "Password mismatch"}
          </FormFeedback>
          <Button color="primary">Sign Up</Button>
        </FormGroup>
      </Form>
    );
  }
}

export default SignupForm;
