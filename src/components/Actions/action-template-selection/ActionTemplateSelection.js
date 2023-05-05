import React, { Component } from 'react';
import './ActionTemplateSelection.scss';
import { CSSTransition } from 'react-transition-group';
import conf from '../../../conf/configuration'
import logo from '../../../assets/logo/logo.png'
import { Analytics } from '../../Analytics';
import { motion, AnimatePresence } from "framer-motion"
import AuthWrapper from '../../auth/authWrapper/AuthWrapper'
import { Link } from 'react-router-dom'
import logo2 from '../../../assets/logo/logo2.png'

import Navbar from '../../Navbar';

class ActionTemplateSelection extends Component {
  constructor(props) {
    super(props);
    var AnalyticsObject = Analytics;
    AnalyticsObject("Locality-selection");
    console.log("Locality selection action")
  }
  render() {
    return (
      <div className="action">
        <div className="action-introWrapper action-selection">
          
          <AnimatePresence>
            {this.props.isAuthShowed &&
              <motion.div exit={{ opacity: 0 }} initial="hidden" animate="visible" variants={this.authVariants} transition={{ duration: 0.1 }}  >
                <AuthWrapper closeModal={this.props.authBtnHandler} />
              </motion.div>
            }
          </AnimatePresence>
          <div className="head">
            
            <div className="brand">
              {conf.brand.useImg == false ? <span>{conf.brand.name}</span> : <img className="logo" src={logo} />}
            </div>
            <div className="authentication">
              {this.props.user == null && <Link style={{ textDecoration: "none" }} onClick={() => this.props.setCurrentStep(0)} to={{ pathname: "/" }} className="authenticationButton"> Login</Link>}
              {this.props.user != null && <Link style={{ textDecoration: "none" }} to={{ pathname: "/dashboard" }} className="authenticationButton"> My Account</Link>}
              {this.props.user != null && <a onClick={() =>{ this.props.logout()}} className="authenticationButton">Logout</a>}
              <Navbar />  
            </div>
          </div>
        <div className='logo2'><img src={logo2} /></div>

          <CSSTransition appear={true} in={true} classNames="fade" timeout={1000}>
            <div className="body">
              <h1>Which <span> template </span> do you like?.</h1>
              <button onClick={this.props.handlePreviewToggle} className="btn-default  mobile-only">
                Locality
            </button>
            </div>
          </CSSTransition>
          <div className="footer mobile-only">
          </div>
        </div>
      </div>
    );
  };
}
export default ActionTemplateSelection;
