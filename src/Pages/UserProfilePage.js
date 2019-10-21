import React from "react";
import axios from "axios";

class UserProfilePage extends React.Component {
  state = {
    userImages: []
  };

  componentDidMount() {
    // performing a GET request
    axios
      .get(
        `https://insta.nextacademy.com/api/v1/images?userId=${this.props.match.params.id}`
      )
      .then(result => {
        console.log(result);
        // If successful, we do stuffs with 'result'
        this.setState({ userImages: result.data });
        console.log(this.state.userImages);
      })
      .catch(error => {
        // If unsuccessful, we notify users what went wrong
        console.log("ERROR: ", error);
      });
  }

  render() {
    console.log(this.props);
    let selected;
    this.props.users.forEach(user => {
      if (user.id === parseInt(this.props.match.params.id)) {
        console.log(user.id);
        selected = user.username;
        return selected;
      }
    });
    console.log(selected);
    return (
      <>
        <h1>User Profile Page</h1>
        <h3>Id number: {this.props.match.params.id}</h3>
        <h3>{selected}</h3>
        {this.state.userImages.map((userImage, index) => {
          return <img src={userImage} alt="" key={index}></img>;
        })}
      </>
    );
  }
}

export default UserProfilePage;
