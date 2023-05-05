import React, { Component } from 'react';
import './AuthWrapper.scss'
import Login from '../login/Login'
import { motion, AnimatePresence } from "framer-motion"
import Register from '../register/Register'
import RecoverPassword from '../recoverPassword/RecoverPassword';
import Toast from '../../Toasts/Toats';
class AuthWrapper extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedInShowed: true,
            isRecoverPasswordShowed: false,
            isErrorToastShowed: false,
            isSuccessToastShowed: false,
            errorMessage: ""
        }
        this.handleClickOutside = this.handleClickOutside.bind(this)
        this.handleNavigationClick = this.handleNavigationClick.bind(this);
        this.showPasswordRecovery = this.showPasswordRecovery.bind(this);
        this.throwError = this.throwError.bind(this);
        this.throwSuccess = this.throwSuccess.bind(this);
    }
    componentDidMount() {
        document.getElementById("authWrapper").addEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside(e) {
        if (e.target !== e.currentTarget) return;
        this.props.closeModal();
    }
    handleNavigationClick() {
        this.setState((prevState, props) => ({
            isLoggedInShowed: prevState.isLoggedInShowed ? false : true,
            isRecoverPasswordShowed: false,
        }));
    }
    showPasswordRecovery() {
        this.setState((prevState, props) => ({
            isLoggedInShowed: false,
            isRecoverPasswordShowed: true,
        }));
    }
    throwError(message) {
        this.setState({
            isErrorToastShowed: true,
            errorMessage: message
        });
        setTimeout(() => {
            this.setState({
                isErrorToastShowed: false
            });
        }, 2000);
    }
    throwSuccess() {
        this.setState({
            isSuccessToastShowed: true,
        });
        setTimeout(() => {
            this.setState({
                isSuccessToastShowed: false
            });
        }, 2000);
    }
    render() {
        return (
            <div id="authWrapper" className="authWrapper">
                <AnimatePresence>
                    {this.state.isErrorToastShowed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Toast type="Error" message={this.state.errorMessage}></Toast>
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {this.state.isSuccessToastShowed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Toast type="SuccessEmail" />
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="authModal">
                    <AnimatePresence>
                        {
                            this.state.isLoggedInShowed &&
                            <motion.div className="motionDivAuth" initial={{ translateX: 500 }} transition={{ duration: 0.4 }} animate={{ translateX: 0 }} exit={{ translateX: -500 }}        >
                                <Login showPasswordRecovery={this.showPasswordRecovery} throwError={this.throwError} closeModal={this.props.closeModal} handleNavigationClick={this.handleNavigationClick} />
                            </motion.div>
                        }
                    </AnimatePresence>
                    <AnimatePresence>
                        {
                            this.state.isLoggedInShowed == false && this.state.isRecoverPasswordShowed == false &&
                            <motion.div className="motionDivAuth" initial={{ translateX: 500 }} transition={{ duration: 0.4 }} animate={{ translateX: 0, }} exit={{ translateX: -500 }}>
                                <Register closeModal={this.props.closeModal} throwError={this.throwError} handleNavigationClick={this.handleNavigationClick} />
                            </motion.div>
                        }
                    </AnimatePresence>
                    <AnimatePresence>
                        {
                            this.state.isRecoverPasswordShowed == true &&
                            <motion.div style={{ display: "flex", justifyContent: "center" }} className="motionDivAuth" initial={{ translateX: 500 }} transition={{ duration: 0.4 }} animate={{ translateX: 0, }} exit={{ translateX: -500 }}>
                                <RecoverPassword throwSuccess={this.throwSuccess} closeModal={this.props.closeModal} throwError={this.throwError} handleNavigationClick={this.handleNavigationClick} />
                            </motion.div>
                        }
                    </AnimatePresence>
                </div>
            </div>
        )
    }
}
export default AuthWrapper;