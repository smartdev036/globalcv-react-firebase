import React, { Component } from 'react';
import './Education.scss';
import Arrow from '../../../assets/arrow.png';
import SimpleInput from '../simple-input/SimpleInput';
import SimpleTextArea from '../simple-textarea/SimpleTextarea';
class Education extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: "false",
            school: '(not-set)',
            degree: '(not-set)',
            started: '(not-set)',
            finished: '(not-set)',
            description: '(not-set)'
        }
        this.toggleHandle = this.toggleHandle.bind(this);
        this.handleInputs = this.handleInputs.bind(this);
    }
    // Changing panel title when user type something in title
    handleInputs(inputName, inputValue) {
        switch (inputName) {
            case "School":
                this.setState({ school: inputValue });
                this.props.handleInputs(inputName, inputValue, this.props.id, "Education");
                break;
            case "Degree":
                this.setState({ degree: inputValue });
                this.props.handleInputs(inputName, inputValue, this.props.id, "Education");
                break;
            case "Started":
                this.setState({ started: inputValue });
                this.props.handleInputs(inputName, inputValue, this.props.id, "Education");
                break;
            case "Finished":
                this.setState({ finished: inputValue });
                this.props.handleInputs(inputName, inputValue, this.props.id, "Education");
                break;
            case "Course Description":
                this.setState({ description: inputValue });
                this.props.handleInputs(inputName, inputValue, this.props.id, "Education");
                break;
            default:
                break;
        }
    }
    // Handling toggle click 
    toggleHandle() {
        this.state.isOpened === "false" ? this.setState({ isOpened: "true" }) : this.setState({ isOpened: "false" });
    }
    render() {
        return (
            <div className="panel">
                <div className="panel-heading">
                    <span className="panel-title"> {this.state.school == "(not-set)" ? this.props.school : this.state.school}</span>
                    <span className="panel-subtitle">  {this.state.started == "(not-set)" ? this.props.started : this.state.started} -  {this.state.finished == "(not-set)" ? this.props.finished : this.state.finished}</span>
                    <img alt="more" onClick={this.toggleHandle} className={this.state.isOpened === "false" ? "panel-toggler " : "panel-toggler panel-toggler-opened"} src={Arrow} />
                </div>
                <div className={this.state.isOpened === "false" ? "panel-body hidden" : "panel-body"}>
                    <div className="grid-2-col">
                        <SimpleInput value= {this.state.school == "(not-set)" ? this.props.school : this.state.school} handleInputs={this.handleInputs} title="School" />
                        <SimpleInput    value= {this.state.degree == "(not-set)" ? this.props.degree : this.state.degree}  handleInputs={this.handleInputs} title="Degree" />
                        <div className=" grid-2-col">
                            <SimpleInput placeholder="ex : aug 2020"  value= {this.state.started == "(not-set)" ? this.props.started : this.state.started}  handleInputs={this.handleInputs} title="Started" />
                            <SimpleInput  placeholder="ex : aug 2021"  value= {this.state.finished == "(not-set)" ? this.props.finished : this.state.finished}  handleInputs={this.handleInputs} title="Finished" />
                        </div>
                    </div>
                    <SimpleTextArea  value= {this.state.description == "(not-set)" ? this.props.description : this.state.description}  handleInputs={this.handleInputs} title="Course Description" />
                </div>
            </div>
        )
    }
}
export default Education;