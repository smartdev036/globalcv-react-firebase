import React, { Component } from 'react';
import './Action.scss';
import ActionIntroduction from '../action-step-introduction/ActionIntroduction'
import ActionStepSelection from '../action-step-selection/ActionStepSelection'
import ActionLocalSelection from '../action-local-selection/ActionLocalSelection';
import ActionTemplateSelection from '../action-template-selection/ActionTemplateSelection';
import ActionFilling from '../action-step-filling/ActionFilling'
// import Dashboard from '../../Dashboard/DashboardMain/DashboardMain'
import { Redirect } from "react-router-dom";
class Action extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthShowed: false,
    }
    this.authBtnHandler = this.authBtnHandler.bind(this)
  }
  authBtnHandler() {
    if (this.props.user == null) {
      this.setState((prevState, props) => ({
        isAuthShowed: prevState.isAuthShowed ? false : true
      }));
    } else if (this.props.user != null) {
      this.setState({
        isAuthShowed: false
      })
    }
  }
  /// This  class have nextStep passed to it in props so we be able to navigate between steps 
  // Note Step state is handled in parent to render the right components
  render() {
    console.log("Action console. :; ", this.props.currentStep)
    // Checking which step is passed to the action wrapper and render the right component 
    switch (this.props.currentStep) {
      case "Introduction":
        return (<ActionIntroduction goThirdStep={this.props.goThirdStep} isAuthShowed={this.state.isAuthShowed} authBtnHandler={this.authBtnHandler} logout={this.props.logout} user={this.props.user} />);
      case "Template Level":
        return (<ActionStepSelection setCurrentStep={this.props.setCurrentStep} isAuthShowed={this.state.isAuthShowed} authBtnHandler={this.authBtnHandler} logout={this.props.logout} user={this.props.user} handlePreviewToggle={this.props.handlePreviewToggle} />);
      case "Locality Selection":
        return (<ActionLocalSelection setCurrentStep={this.props.setCurrentStep} isAuthShowed={this.state.isAuthShowed} authBtnHandler={this.authBtnHandler} logout={this.props.logout} user={this.props.user} handlePreviewToggle={this.props.handlePreviewToggle} />);
      case "Template Selection":
        return (<ActionTemplateSelection setCurrentStep={this.props.setCurrentStep} isAuthShowed={this.state.isAuthShowed} authBtnHandler={this.authBtnHandler} logout={this.props.logout} user={this.props.user} handlePreviewToggle={this.props.handlePreviewToggle} />);
      case "Adding Data":
        return (<ActionFilling values={this.props.values} logout={this.props.logout} user={this.props.user} handleDelete={this.props.handleDelete} progress={this.props.progress} handleInputs={this.props.handleInputs} />);
      default:
        return (<ActionIntroduction />);
    }
  };
}
export default Action;
