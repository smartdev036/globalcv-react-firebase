import React, { Component } from 'react';
import './Register.scss';
import GoogleImage from '../../../assets/google.png';
import FacebookImage from '../../../assets/facebook.png';
import Input from '../../Form/simple-input/SimpleInput';
import { addUser, IncrementUsers } from '../../../firestore/dbOperations'
import fire from '../../../conf/fire';
import Toast from '../../Toasts/Toats'
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            passwordRepeat: "",
        }
        this.handleInputs = this.handleInputs.bind(this);
        this.signUp = this.signUp.bind(this);
    }
    handleInputs(title, value) {
        switch (title) {
            case "Email":
                this.setState((prevState, props) => ({
                    email: value
                }));
                break;
            case "Password":
                this.setState((prevState, props) => ({
                    password: value
                }));
                break;
            case "Repeat Password":
                this.setState((prevState, props) => ({
                    passwordRepeat: value
                }));
                break;
            default:
                break;
        }
    }
    signUp(event) {
        event.preventDefault();
        if (this.state.passwordRepeat == this.state.password) {
            fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
                IncrementUsers(u.user.uid)
            }).then((u) => {
                //    console.log(u)
                this.props.closeModal();
            }).catch((error) => {
                this.props.throwError(error.message);
                console.log(error);
            });
        } else {
            this.props.throwError("Passwords does not match");
        }
    }
    render() {
        return (
            <div className="auth">
                <div className="head">
                    <span>Register</span>
                </div>
                <div className="body">
                    <form onSubmit={this.signUp} className="registerForm">
                        <Input title="Email" handleInputs={this.handleInputs} />
                        <Input type="Password" title="Password" handleInputs={this.handleInputs} />
                        <Input type="Password" title="Repeat Password" handleInputs={this.handleInputs} />
                        <input className="inputSubmit" value="Register" type="submit" />
                    </form>
                </div>
                {/* Modal Footer */}
                <div className="modalFooter">
                    <span>Already have an account ? <a onClick={() => this.props.handleNavigationClick()}>Login</a></span>
                </div>
            </div>
        );
    }
}
export default Register;