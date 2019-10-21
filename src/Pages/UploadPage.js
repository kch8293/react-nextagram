import React from "react";
import UploadForm from "../Containers/UploadForm";
import axios from "axios";

class UploadPage extends React.Component {
  state = {
    previewImage: null,
    message: null
  };
  handleFile = imageFile => {
    // Prevent the default bahaviour of the form submitting
    // AUthorization of the user
    let JWT = localStorage.getItem("userToken");
    let formdata = new FormData();
    // Append the key:value pair to the formData object
    formdata.append("image", imageFile);
    axios
      .post("https://insta.nextacademy.com/api/v1/images/", formdata, {
        headers: { Authorization: `Bearer ${JWT}` }
      })
      .then(result => {
        if (result.data.success) {
          this.setState({
            message: "Image Uploaded Successfully"
          });
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    return <UploadForm handleFile={this.handleFile}></UploadForm>;
  }
}

export default UploadPage;
