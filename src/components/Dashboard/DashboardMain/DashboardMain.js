import React, { Component } from 'react';
import './DashboardMain.scss'
import conf from '../../../conf/configuration'
import logo from '../../../assets/logo/logo.png'
import { Link } from 'react-router-dom';
import Toasts from '../../Toasts/Toats';
import Stats from '../stats/stats';
import fire from '../../../conf/fire'
// Components
import ResumeList from '../ResumesList/ResumesList'
import ProfileDropDown from '../ProfileDropdown/ProfileDropdown'
import Settings from '../Settings/Settings'
// Images
import userImage from '../../../assets/user.png'
import arrow from '../../../assets/arrow.png'
import { getFullName, getAds } from '../../../firestore/dbOperations';
// Animation Library
import { motion, AnimatePresence, transform } from "framer-motion"
class DashboardMain extends Component {
  constructor(props) {
    super(props);
    this.authListener = this.authListener.bind(this);
    this.state = {
      user: null,
      role: "user",
      firstname: "",
      lastname: "",
      isDeleteToastShowed: false,
      isDropdownShowed: false,
      isCommingSoonShowed: false,
      isSettingsShowed: false,
      isDashboardShowed: true
    }
    this.dropdownHandler = this.dropdownHandler.bind(this);
    this.handleCoverLetter = this.handleCoverLetter.bind(this);
    this.showDeletedToast = this.showDeletedToast.bind(this);
    this.settingsClickHandler = this.settingsClickHandler.bind(this);
    this.handleDashboardClick = this.handleDashboardClick.bind(this)
    this.logout = this.logout.bind(this);
  }
  componentWillMount() {
    this.authListener();
  }
  /// Check if the user is authenticated
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.uid })
        getFullName(user.uid).then((value) => { value !== undefined && this.setState({ firstname: value.firstname, lastname: value.lastname }) });
        localStorage.setItem('user', user.uid);
        /// Checking if user ad
        if (user.email === conf.adminEmail) {
          this.setState({ role: "admin" })
          getAds();
        }
      } else {
        this.setState({ user: null })
        localStorage.removeItem("user");
      }
    })
  }
  // Show Drop down
  dropdownHandler() {
    this.setState((prevState, props) => ({
      isDropdownShowed: !prevState.isDropdownShowed
    }))
  }
  // Handle Settings Click
  settingsClickHandler() {
    this.setState((prevState, props) => ({ isSettingsShowed: !prevState.isSettingsShowed }));
  }
  // Handle Settings Click
  handleDashboardClick() {
    this.setState((prevState, props) => ({ isSettingsShowed: false, isDashboardShowed: true }));
  }
  // Logout 
  logout() {
    fire.auth().signOut();
    localStorage.removeItem("currentResumeId");
    localStorage.removeItem("currentResumeItem");
    this.currentResume = null;
  }
  // Handling cover letter click to show coming soon message
  handleCoverLetter() {
    setTimeout(() => {
      this.setState((prevStat, props) => ({ isCommingSoonShowed: !prevStat.isCommingSoonShowed }))
    }, 2000);
    this.setState((prevStat, props) => ({ isCommingSoonShowed: !prevStat.isCommingSoonShowed }))
  }
  // Show deleted toast
  showDeletedToast() {
    setTimeout(() => {
      this.setState((prevState, props) => ({
        isDeleteToastShowed: !prevState.isDeleteToastShowed
      }));
    }, 2000);
    this.setState((prevState, props) => ({
      isDeleteToastShowed: !prevState.isDeleteToastShowed
    }));
  }
  render() {
    return this.state.user !== null ?
      <div className="dashboardWrapper">
        <AnimatePresence>
          {this.state.isDeleteToastShowed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Toasts type="Delete" />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="navbar">
          {/* Website Logo */}
          <div className="brand">
            {conf.brand.useImg ? <img src={logo} /> : <span> {conf.brand.name} </span>}
          </div>
          {/* Navigation List */}
          <div className="dashboardNavigaitionList">
            <ul>
              <li> <Link to="/" className="dashboardNavItem">Homepage</Link></li>
              <li><Link onClick={() => this.handleDashboardClick()} className="dashboardNavItem dashboardNavItemActive">Dashboard</Link></li>
              <li><Link onClick={() => this.handleCoverLetter()} className="dashboardNavItem">Cover Letter</Link>
                <AnimatePresence>
                  {this.state.isCommingSoonShowed && <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="statusSoon">Comming soon</motion.a>}
                </AnimatePresence>
              </li>
            </ul>
          </div>
          {/* Profile  */}
          <div onClick={() => this.dropdownHandler()} className="dashboarProfile">
            <img className="dashboarProfileImage" src={userImage} alt="profile Image" />
            <a className="dashboarProfileName">{this.state.firstname === "" || this.state.lastname === "" || this.state.lastname === undefined || this.state.firstname === "" ? "Welcome Back" : this.state.firstname + " " + this.state.lastname} <img src={arrow} alt="toggler" /></a>
            <AnimatePresence>
              {this.state.isDropdownShowed &&
                <motion.div transition={{ duration: 0.3 }} initial={{ translateX: 400 }} animate={{ translateX: 0 }} exit={{ translateX: 400 }} className="dashboardDropdown">
                  <ProfileDropDown handleDashboardClick={this.handleDashboardClick} handleSettingsClick={this.settingsClickHandler} logout={this.logout} />
                </motion.div>}
            </AnimatePresence>
          </div>
        </div>
        <div className="dashboardContentWrapper">
          {this.state.role === "admin" && <Stats />}
          {!this.state.isSettingsShowed ? <ResumeList showDeletedToast={this.showDeletedToast} /> : <Settings role={this.state.role} firstname={this.state.firstname} lastname={this.state.lastname} uid={this.state.user} />}
        </div>
      </div>
      : "  "
  }
}
export default DashboardMain;