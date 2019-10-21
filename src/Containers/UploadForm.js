import React from "react";
import { Form, FormGroup, FormText, Input, Button } from "reactstrap";

class UploadForm extends React.Component {
  state = {
    imageFile: null,
    previewImage: null
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleFile(this.state.imageFile);
  };
  handleChange = e => {
    this.setState({
      imageFile: e.target.files[0],
      previewImage: URL.createObjectURL(e.target.files[0])
    });
  };

  render() {
    const { previewImage, message } = this.state;
    return (
      <>
        <Form onSubmit={e => this.handleSubmit(e)}>
          <FormGroup>
            <Input
              type="file"
              name="image-file"
              onChange={e => this.handleChange(e)}
            />
            <FormText color="muted">
              Make sure the image being uploaded is a supported format.
            </FormText>
          </FormGroup>
          <Button type="submit" color="primary">
            Upload
          </Button>
        </Form>
        <div className="card">
          {previewImage ? (
            <img
              src={previewImage}
              width="50%"
              height="50%"
              alt="preview_img"
            />
          ) : (
            <h3 className="text-center">
              {message ? message : "Live Preview"}
            </h3>
          )}
        </div>
      </>
    );
  }
}

export default UploadForm;
