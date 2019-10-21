import React from "react";
import axios from "axios";

class MyProfilePage extends React.Component {
  state = {
    id: "",
    username: "",
    profilePicture: "",
    email: ""
  };
  componentDidMount() {
    const JWT = localStorage.getItem("userToken");
    axios
      .get("https://insta.nextacademy.com/api/v1/users/me", {
        headers: {
          Authorization: `Bearer ${JWT}`
        }
      })
      .then(result => {
        console.log(result);
        this.setState({
          id: result.data.id,
          username: result.data.username,
          profilePicture: result.data.profile_picture,
          email: result.data.email
        });
        console.log(this.state.id);
      })
      .catch(error => {
        // If unsuccessful, we notify users what went wrong
        console.log("ERROR: ", error.response);
      });
  }

  render() {
    const { id, username, profilePicture, email } = this.state;
    return (
      <>
        <h1>My Profile Page</h1>
        <h2>Welcome back, {username}</h2>
        <img
          src={profilePicture}
          alt="user profile"
          className="rounded-circle"
        ></img>
        <p>email: {email}</p>
        <p>id: {id}</p>
      </>
    );
  }
}

export default MyProfilePage;
