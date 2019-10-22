import React from "react";
import axios from "axios";
import { Col, Row } from "reactstrap";

class UserImages extends React.Component {
  state = {
    userImages: []
  };

  componentDidMount() {
    // performing a GET request
    axios
      .get(
        `https://insta.nextacademy.com/api/v1/images?userId=${this.props.id}`
      )
      .then(result => {
        // console.log(result);
        // If successful, we do stuffs with 'result'
        this.setState({ userImages: result.data });
      })
      .catch(error => {
        // If unsuccessful, we notify users what went wrong
        console.log("ERROR: ", error);
      });
  }
  render() {
    return (
      <>
        {this.state.userImages.map((userImage, index) => (
          <Col lg-3>
            <img
              key={index}
              src={userImage}
              alt="UserImage"
              className="UserImages_Image"
            ></img>
          </Col>
        ))}
      </>
    );
  }
}
export default UserImages;
