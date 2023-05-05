import React, { Component } from 'react';
import './ImgUploadInput.scss';
import manPicture from '../../../assets/young.png'
import ImageUploader from "react-images-upload";
class ImgUploadInput extends Component {
  constructor(props) {
    super(props);
    this.state = { picture: '' };
    this.onDrop = this.onDrop.bind(this);
  }
  onDrop(pictureFiles, pictureDataURL) {
    this.setState({
      picture: pictureDataURL[pictureDataURL.length - 1]
    });
    setTimeout(() => {
      this.props.handleInputs(this.props.title, this.state.picture);
    }, 300);
  }
  render() {
    return (
      <div className="imageInputUpload">
        <div className="imageInputTitle">  Image</div>
        <ImageUploader
          withIcon={true}
          buttonText="Choose images"
          onChange={this.onDrop}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
        />
      </div>);
  }
}
export default ImgUploadInput;