import React, { Component } from 'react';
import './Board.scss';
import Introduction from '../board-step-introduction/BoardIntroduction';
import BoardSelection from '../board-step-selection/BoardSelection';
import BoardLevel from '../board-step-level/BoardLevel';
import LocalSelection from '../local-selection/localSelection';
import BoardFilling from '../board-step-filling/BoardFilling'
class Board extends Component {
  render() {
    // Checking which step is passed to the board wrapper and render the right component 
    switch (this.props.currentStep) {
      case "Introduction":
        return (<Introduction nextStep={this.props.nextStep} user={this.props.user} />);
        case "Template Level":
          return (<BoardLevel changeResumeName={this.props.changeResumeName} nextStep={this.props.nextStep} stepBack={this.props.stepBack}  history = {this.props.history} />);
        case "Locality Selection":
          return (<LocalSelection changeResumeName={this.props.changeResumeName} nextStep={this.props.nextStep} stepBack={this.props.stepBack}  history = {this.props.history} />);
        case "Template Selection":
          return (<BoardSelection changeResumeName={this.props.changeResumeName} nextStep={this.props.nextStep} stepBack={this.props.stepBack}  history = {this.props.history}/>);
        default:
          return (<BoardFilling currentResumeName={this.props.currentResumeName} stepBack={this.props.stepBack} values={this.props.values} history={this.props.history} />);
    }
  };
}
export default Board;
