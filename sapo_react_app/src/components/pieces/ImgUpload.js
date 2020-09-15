import React, { Component } from "react";
import firebase from "../../firebase/index";
import FileUploader from "react-firebase-file-uploader";
class ImgUpload extends Component {
  state = {
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: "",
  };
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = (progress) => this.setState({ progress });
  handleUploadError = (error) => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = (filename) => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => this.props.onChange(url));
  };
  render() {
    return (
      <div>
        {this.state.isUploading && <p>Đang tải: {this.state.progress} %</p>}
        <label
          style={{
            backgroundColor: this.props.color,
            color: "white",
            padding: this.props.padding,
            borderRadius: 4,
         
            cursor: "pointer",
          }}
        >
          {this.props.name}
          <FileUploader
            hidden
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={firebase.storage().ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        </label>
      </div>
    );
  }
}
export default ImgUpload;
