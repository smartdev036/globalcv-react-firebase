import React, { Component } from 'react';
import Lottie from 'react-lottie';
import './initialisationSetup.scss'
import successAnimation from '../../../assets/animations/lottie-success.json'
import Input from '../../Form/simple-input/SimpleInput'
import conf from '../../../conf/configuration'
import fire from '../../../conf/fire';
import addUser, { setA } from '../../../firestore/auth'
import { set } from 'react-ga';
class initialisationSetup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: conf.adminEmail,
            password: "",
            passwordRepeat: "",
        }
        this.handleInputs = this.handleInputs.bind(this);
        this.signUp = this.signUp.bind(this);
    }
    signUp(event) {
        event.preventDefault();
        
        if (this.state.passwordRepeat == this.state.password && this.state.email == conf.adminEmail) {
            fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
                this.props.closeInitialisation(); 
                    addUser(u.user.uid)
                    setA(u.user.uid)
            
                
            }).catch((error) => {
                //     this.props.throwError(error.message);
                console.log(error);
            });
        } 
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
    render() {
        const successOptions = {
            loop: false,
            autoplay: true,
            animationData: successAnimation,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };
        return (
            <div className="instalationSuccess">
                <form onSubmit={this.signUp} className="registerForm">
                    <Input disabled={true} title="Email" value={conf.adminEmail} handleInputs={this.handleInputs} />
                    <Input  type="Password"  title="Password" handleInputs={this.handleInputs} />
                    <Input  type="Password" title="Repeat Password" handleInputs={this.handleInputs} />
                    <input className="inputSubmit" value="Register" type="submit" />
                </form>
            </div>
        )
    }
}
export default initialisationSetup