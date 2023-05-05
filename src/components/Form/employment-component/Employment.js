
import React, { Component } from 'react';
import './Employment.scss'
import Arrow from '../../../assets/arrow.png'
import SimpleInput from '../simple-input/SimpleInput'
import SimpleTextArea from '../simple-textarea/SimpleTextarea'
class Employment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: "false",
            jobTitle: '(not-set)',
            begin: '(not-set)',
            end: '(not-set)',
            description: '(not-set)',
            employer: '(not-set)'
        }
        this.toggleHandle = this.toggleHandle.bind(this);
        this.handleInputs = this.handleInputs.bind(this);
    }
    // Handling toggle click 
    toggleHandle() {
        this.state.isOpened === "false" ? this.setState({ isOpened: "true" }) : this.setState({ isOpened: "false" });
    }
    // Changing panel title when user type something in title
    handleInputs(inputName, inputValue) {
        switch (inputName) {
            case "Job Title":
                this.setState({ jobTitle: inputValue });
                this.props.handleInputs(inputName, inputValue, this.props.id, "Employment");
                break;
            case "Begin":
                this.setState({ begin: inputValue });
                this.props.handleInputs(inputName, inputValue, this.props.id, "Employment");
                break;
            case "End":
                this.setState({ end: inputValue });
                this.props.handleInputs(inputName, inputValue, this.props.id, "Employment");
                break;
            case "Employer":
                this.setState({ employer: inputValue });
                this.props.handleInputs(inputName, inputValue, this.props.id, "Employment");
                break;
            case "Description":
                this.setState({ description: inputValue });
                this.props.handleInputs(inputName, inputValue, this.props.id, "Employment");
                break;
            default:
                break;
        }
    }
    render() {
        return (
            <div className="panel">
                <div className="panel-heading">
                    <span className="panel-title"> {this.state.jobTitle == "(not-set)" ? this.props.jobTitle : this.state.jobTitle}</span>
                    <span className="panel-subtitle"> {this.state.begin} - {this.state.end} </span>
                    <img alt="more" onClick={this.toggleHandle} className={this.state.isOpened === "false" ? "panel-toggler " : "panel-toggler panel-toggler-opened"} src={Arrow} />
                </div>
                <div className={this.state.isOpened === "false" ? "panel-body hidden" : "panel-body"}>
                    <div className="grid-2-col">
                        {/* Passing handleInputs to get user text from input and handle it in parent ( this one ) */}
                        <SimpleInput value= {this.state.jobTitle == "(not-set)" ? this.props.jobTitle : this.state.jobTitle}  handleInputs={this.handleInputs} title="Job Title" />
                        <SimpleInput  value= {this.state.employer == "(not-set)" ? this.props.employer : this.state.employer}  handleInputs={this.handleInputs} title="Employer" />
                        <div className=" grid-2-col">
                            <SimpleInput placeholder="ex : aug 2020"  value= {this.state.begin == "(not-set)" ? this.props.begin : this.state.begin}  handleInputs={this.handleInputs} title="Begin" />
                            <SimpleInput placeholder="ex : Jan 2021"   value= {this.state.end == "(not-set)" ? this.props.end : this.state.end}  handleInputs={this.handleInputs} title="End" />
                        </div>
                    </div>
                    <SimpleTextArea  value= {this.state.description == "(not-set)" ? this.props.description : this.state.description}  handleInputs={this.handleInputs} title="Description" />
                </div>
            </div>
        )
    }
}
export default Employment;