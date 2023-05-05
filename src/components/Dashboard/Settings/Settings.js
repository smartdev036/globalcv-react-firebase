import React, { Component } from 'react'
import './Settings.scss'
import Input from '../../Form/simple-input/SimpleInput'
import { addUser, changePassword } from '../../../firestore/dbOperations'
import { motion, AnimatePresence } from 'framer-motion'
import Toasts from '../../Toasts/Toats'
class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            newPassword: "",
            isPersonalSuccessToastShowed: false,
            isPasswordChangedToastShowed: false
        }
        this.handleInputs = this.handleInputs.bind(this);
        this.personalInfoFormHandler = this.personalInfoFormHandler.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }
    // Receiving data from inputs
    handleInputs(title, value) {
        switch (title) {
            case "First name":
                this.setState({ firstname: value })
                break;
            case "Last name":
                this.setState({ lastname: value })
                break;
            case "New Password":
                this.setState({ newPassword: value })
                break;
            default:
                break;
        }
    }
    // handle Personal Info from submit
    personalInfoFormHandler(event) {
        event.preventDefault();
        if (this.state.firstname != "" && this.state.lastname != "") {
            addUser(this.props.uid, this.state.firstname, this.state.lastname)
            this.setState({ isPersonalSuccessToastShowed: true });
            setTimeout(() => {
                document.location.reload();
            }, 2000);
        }
    }
    // handle Password change
    handleChangePassword(event) {
        event.preventDefault();
        if (this.state.newPassword.length > 5) {
            changePassword(this.state.newPassword);
            this.setState({ isPasswordChangedToastShowed: true })
            setTimeout(() => {
                this.setState({ isPasswordChangedToastShowed: false })
            }, 2000);
        } else {
            alert("Password must contain 6 or more letters")
        }
    }
    render() {
        return (
            <div className="dashboardContent">
                <AnimatePresence>
                    {this.state.isPersonalSuccessToastShowed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Toasts type="Name Changed" />
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {this.state.isPasswordChangedToastShowed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Toasts type="Password Changed" />
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="head">
                    <div className="headContent">
                        <h2>Settings </h2>
                    </div>
                </div>
                <div style={{ justifyContent: "flex-start" }} className="dashboardContentWrapper">
                    {this.props.role !== "admin" &&
                        <div style={{ width: "100%" }}>
                            <div className="dashboardSubtitle">
                                <span>PERSONAL INFO</span>
                            </div>
                            <div className="settingsCard">
                                <form onSubmit={this.personalInfoFormHandler}>
                                    <div className="grid-2-col">
                                        <Input placeholder={this.props.firstname} handleInputs={this.handleInputs} title="First name" />
                                        <Input placeholder={this.props.lastname} handleInputs={this.handleInputs} title="Last name" />
                                    </div>
                                    <div className="dashboardAction">
                                        <input type="submit" className="saveInput" value="Save" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                    {/* Change Password */}
                    <div className="dashboardSubtitle">
                        <span>CHANGE PASSWORD</span>
                    </div>
                    <div style={{ width: "94%" }} className="settingsCard">
                        <form onSubmit={this.handleChangePassword}>
                            <Input type="Password" handleInputs={this.handleInputs} title="New Password" />
                            <div className="dashboardAction">
                                <input type="submit" className="saveInput" value="Save" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Settings;