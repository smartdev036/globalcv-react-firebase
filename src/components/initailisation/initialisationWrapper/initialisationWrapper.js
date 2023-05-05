import React, { Component } from 'react';
import './initialisationWrapper.scss'
import { motion, AnimatePresence } from "framer-motion"
import InstallationSuccess from '../installationSuccess/installationSuccess'
import InitialisationSetup from '../initialisationSetup/initialisationSetup'
class InitialisationWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedInShowed: false,
            step: 0,
        }
        this.nextStep= this.nextStep.bind(this);
    }
    nextStep() {
        this.setState((prevState, props) => ({
            step: prevState.step + 1
        }))
    }
    render() {
        return (
            <div id="authWrapper" className="authWrapper">
                <div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="authModal">
                    <AnimatePresence>
                        {this.state.step == 0 && <motion.div style={{position:"absolute",height:"100%",width:"100%"}} initial={{opacity:0}} animate={{opacity:1}}  transition={{duration:0.4}} exit={{opacity:0}}> <InstallationSuccess  nextStep={this.nextStep} /> </motion.div>}
                    </AnimatePresence>
                    <AnimatePresence>
                    {this.state.step == 1 && <motion.div style={{position:"absolute",height:"100%",width:"70%"}} initial={{opacity:0}} animate={{opacity:1}}  transition={{ delay:0.4, duration:0.4}} exit={{opacity:0}}> <InitialisationSetup closeInitialisation={this.props.closeInitialisation}  nextStep={this.nextStep} /> </motion.div>}
                    </AnimatePresence>
                </div>
            </div>
        )
    }
}
export default InitialisationWrapper;