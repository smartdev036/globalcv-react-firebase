import React, { Component } from 'react';
import addResume, { getResumes, removeResume } from '../../../firestore/dbOperations';
import { Link } from 'react-router-dom';
import addResumesImage from '../../../assets/undraw_add_document_0hek.svg'
import fire from '../../../conf/fire'
class ResumesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resumes: null,
    }
    this.setAsCurrentResume = this.setAsCurrentResume.bind(this)
    this.returnResumes = this.returnResumes.bind(this);
    this.deleteResume = this.deleteResume.bind(this);

  }
  deleteResume(userId, resumeId, indexInState) {
    removeResume(userId, resumeId).then(() => {
      this.props.showDeletedToast();  
      setTimeout(() => {
        document.location.reload();
      }, 1300);
    })
    // var array = this.state.resumes;
    // console.log(array);
    // // Notifying the state that a resume has been deleted
    // this.props.showDeletedToast();
    
  }
  // When user click on go to resume we save the resume id he clicked on so we can display the proper inforamtions in our Resume Board
  setAsCurrentResume(resumeId, data) {
    localStorage.removeItem("currentResumeId");
    localStorage.removeItem("currentResumeDara");
    localStorage.setItem("currentResumeId", resumeId)
    localStorage.setItem("currentResumeItem", data)
  }
  //// List all resumes for that specific user
  returnResumes() {
    var resumes = []
    for (let index = 0; index < this.state.resumes.length; index++) {
      resumes[index] = <li key={index} className="resumeItem">
        <div className="resumeItemStatus" style={{ backgroundColor: "#2ecc71" }}></div>
        <div className="resumeItemContent">
          <div className="resumeItemContentWrapper">
            <span className="name">{this.state.resumes[index].item.firstname + " " + this.state.resumes[index].item.lastname}</span>
            <span className="occupation">Web developer</span>
          </div>
          <div style={{ minWidth: "217px" }}>
            <Link onClick={() => this.setAsCurrentResume(this.state.resumes[index].id, JSON.stringify(this.state.resumes[index]))} className="btn-default blue" style={{ textDecoration: "none", fontSize: "13px", marginRight: "10px" }} to="/resume/3"> Go To Resume</Link>
            <a onClick={() => this.deleteResume(localStorage.getItem("user"), this.state.resumes[index].id, index)} style={{ fontSize: "13px", backgroundColor: "#F00"}} className="btn-default red">Remove</a>
          </div>
        </div>
      </li>;
    }
    return resumes;
  }
  componentWillMount() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        var resumes;
        /// Getting the resumes
        resumes = getResumes(user.uid)
        resumes.then((value) => {
          resumes = value;
          this.setState({ resumes: resumes })
        })
      }
    })
  }
  render() {
    return (
      <div className="dashboardContent">
        <div className="head">
          <div className="headContent">
            <h2>Dashboard </h2>
            {this.state.resumes != null && <Link onClick={() => addResume(localStorage.getItem("user"))} to="/" style={{ fontSize: "17px" }} className="btn-default">  + Add new </Link>}
          </div>
          <hr />
          {/* Resumes List */}
          <div className="resumesList">
            {this.state.resumes == null ?
              <div style={{ textAlign: "center", display: "flex", flexDirection: "column", }}>
                <img className="noResumesImage" src={addResumesImage} />
                <Link onClick={() => addResume(localStorage.getItem("user"))} style={{ textDecoration: "none " }} to="/">
                  <a className="btn-default"> Add Resume   </a>
                </Link>
              </div> :
              <ul>
                {/*  Return Resumes */}
                {this.returnResumes()}
              </ul>
            }
          </div>
        </div>
      </div>
    );
  }
}
export default ResumesList;