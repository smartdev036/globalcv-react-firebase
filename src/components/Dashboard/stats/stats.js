import React, { Component } from 'react';
import './stats.scss'
import usersImage from '../../../assets/users.png'
import resumesImage from '../../../assets/resumes.png'
import downloadImage from '../../../assets/download.png'
import { getStats } from '../../../firestore/dbOperations'
class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfUsers: "",
            numberOfResumes: "",
            numberOfDowloads: ""
        }
    }
    componentDidMount() {
        getStats().then((value) => {
            this.setState({
                numberOfUsers: value !== undefined ? value.numberOfUsers : 0,
                numberOfResumes: value !== undefined ? value.numberOfResumesCreated : 0,
                numberOfDowloads: value !== undefined ? value.numberOfResumesDownloaded : 0,
            })
        });
    }
    render() {
        return (
            <div className="adminTabs">
                {/* Users */}
                <div className="adminTab">
                    <div className="adminTabLeft">
                        <span className="number">{this.state.numberOfUsers}</span>
                        <span className="tabTitle" >Users</span>
                    </div>
                    <div className="adminTabRight">
                        <div className="adminTabCircle circleBlue">
                            <img src={usersImage} />
                        </div>
                    </div>
                </div>
                {/* Number Of resumes */}
                <div className="adminTab">
                    <div className="adminTabLeft">
                        <span className="number">{this.state.numberOfResumes}</span>
                        <span className="tabTitle" >Resumes</span>
                    </div>
                    <div className="adminTabRight">
                        <div className="adminTabCircle circleOrange">
                            <img src={resumesImage} />
                        </div>
                    </div>
                </div>
                {/* Downloaded */}
                <div className="adminTab">
                    <div className="adminTabLeft">
                        <span className="number">{this.state.numberOfDowloads}</span>
                        <span className="tabTitle" >Downloads</span>
                    </div>
                    <div className="adminTabRight">
                        <div className="adminTabCircle circleGreen">
                            <img style={{ position: "relative", left: "3px" }} src={downloadImage} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Stats