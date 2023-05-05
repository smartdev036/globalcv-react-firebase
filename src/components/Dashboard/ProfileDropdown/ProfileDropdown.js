import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class ProfileDropdown extends Component {
  render() {
    return (
      <ul>
        <div className="mobileItems">
          <li><Link tp="/" className="dropDownItem">Homepage</Link></li>
          <li><Link onClick={() => this.props.handleDashboardClick()} className="dropDownItem"> Dashboard</Link></li>
          {/* <li><Link className="dropDownItem">Cover Letter</Link></li> */}
        </div>
        <li><Link onClick={() => this.props.handleSettingsClick()} className="dropDownItem">Account Settings</Link></li>
        <li><Link onClick={() => this.props.logout()} to="/" className="dropDownItem logout">Logout</Link></li>
      </ul>
    )
  }
}
export default ProfileDropdown;