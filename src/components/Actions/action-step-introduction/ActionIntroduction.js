import React, { Component } from 'react';
import './ActionIntroduction.scss';
import conf from '../../../conf/configuration'
import logo from '../../../assets/logo/logo.png'
import AuthWrapper from '../../auth/authWrapper/AuthWrapper'
import { motion, AnimatePresence } from "framer-motion"
import fire from '../../../conf/fire'
import { Link } from 'react-router-dom';
import logo2 from '../../../assets/logo/logo2.png'
import Navbar from '../../Navbar';

class ActionIntroduction extends Component {
  constructor(props) {
    super(props);
    if (document.location.search == "/resume/3") {
      this.props.goThirdStep();
    }
  }
  authVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }
  render() {
    return (
      <div  className="action-introWrapper">

        <AnimatePresence>
          {this.props.isAuthShowed &&
            <motion.div exit={{ opacity: 0 }} initial="hidden" animate="visible" variants={this.authVariants} transition={{ duration: 0.4 }}  >
              <AuthWrapper closeModal={this.props.authBtnHandler} />
            </motion.div>
          }
        </AnimatePresence>
        <div className="head">
          <div className="brand">
            {conf.brand.useImg == false ? <span>{conf.brand.name}</span> : <img className="logo" src={logo} />}
          </div>
          <div className="authentication">
            {
              this.props.user != null ?
                <Link style={{ textDecoration: "none" }} to={{ pathname: "/dashboard" }} className="authenticationButton"> My Account</Link>
                :
                <a onClick={() => this.props.authBtnHandler()} className="authenticationButton">  Login </a>
            }
            {this.props.user != null && <a onClick={() => this.props.logout()} className="authenticationButton">Logout</a>}
            <Navbar />
          </div>
        </div>
        <div className='logo2'><img src={logo2} /></div>


        <div className="body">
          <h1>Your resume in three <span>easy</span> steps</h1>
          <ul>
            <li> <div className="numberWrapper"> 1 </div> <span>    Select a template from our collection. </span> </li>
            <li> <div className="numberWrapper"> 2 </div><span> Build you resume using our easy to use resume builder .  </span> </li>
            <li> <div className="numberWrapper"> 3 </div><span>  Download your resume.  </span></li>
          </ul>
        </div>
        <div className="footer">
          <ul>
            <li><a href="/terms">Terms and conditions</a>  </li>
            <li><a href="/privacy-policy">Privacy policy</a>  </li>
            <li><a href="/contact">Contact us</a>  </li>
          </ul>
        </div>
      </div>);
  };
}
export default ActionIntroduction;
