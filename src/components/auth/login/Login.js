import React, { Component } from 'react';
import './Login.scss'
import GoogleImage from '../../../assets/google.png'
import FacebookImage from '../../../assets/facebook.png'
import Input from '../../Form/simple-input/SimpleInput'
import fire from '../../../conf/fire';
import firebase from 'firebase/app';
import 'firebase/auth';
import addUser from '../../../firestore/auth'
import { IncrementUsers } from '../../../firestore/dbOperations';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        this.handleInputs = this.handleInputs.bind(this);
        this.signInWithGoogle = this.signInWithGoogle.bind(this);
        this.signInWithFacebook = this.signInWithFacebook.bind(this);
        this.login = this.login.bind(this);
    }
    login(event) {
        event.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            // Succefully Logged in 
            this.props.closeModal();  // To close  login  modal on success
        }).catch((error) => {
            this.props.throwError(error.message);
            console.log(error);
        });
    }
    handleInputs(title, value) {
        switch (title) {
            case "Email":
                this.setState({ email: value });
                break;
            case "Password":
                this.setState({ password: value });
                break;
            default:
                break;
        }
    }
    signInWithGoogle() {
        var providerGoogle = new firebase.auth.GoogleAuthProvider();
        
        fire.auth().signInWithPopup(providerGoogle).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            addUser(user.uid, "Welcome", "back")
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
        this.props.closeModal();
    }
    signInWithFacebook() {
        var providerFacebook = new firebase.auth.FacebookAuthProvider();
        fire.auth().signInWithPopup(providerFacebook).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            addUser(user.uid, "Welcome", "back")
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
        this.props.closeModal();
    }
    render() {
        return (
            <div className="auth">
                <div className="head">
                    <span>Log in</span>
                </div>
                <div className="body">
                    <div className="socialAuth">
                        {/* Google */}
                        <div onClick={() => { this.signInWithGoogle() }} className="googleAuthItem">
                            <img src={GoogleImage} />
                            <span>Login with Google</span>
                        </div>
                        {/* Facebook */}
                        <div onClick={() => { this.signInWithFacebook() }} className="facebookAuthItem">
                            <img src={FacebookImage} />
                            <span>Login with Facebook</span>
                        </div>
                        {/* Devider */}
                        <div className="devider">
                            <hr />
                            <span>Or</span>
                        </div>
                        {/* Login Form  */}
                        <form onSubmit={this.login}>
                            <div>
                                <Input title="Email" handleInputs={this.handleInputs} />
                            </div>
                            <div>
                                <Input type="Password" title="Password" handleInputs={this.handleInputs} />
                            </div>
                            <input className="inputSubmit" value="Login" type="submit" />
                        </form>
                    </div>
                </div>
                {/* Modal Footer */}
                <div className="modalFooter">
                    <span>Don't have and account? <a onClick={() => this.props.handleNavigationClick()}>Sign up</a></span>
                    <span>Lost 't your password? <a onClick={() => this.props.showPasswordRecovery()}>Recover password</a></span>
                </div>
            </div>
        );
    }
}
export default Login;