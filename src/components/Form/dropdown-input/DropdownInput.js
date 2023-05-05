import React, { Component } from 'react';
import './DropdownInput.scss'
class DropdownInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowed: false,
            value: ''
        };
        this.togglerHandler = this.togglerHandler.bind(this);
        this.options = this.options.bind(this);
    }
    /// Handling user click on input to show options by changing state
    togglerHandler() {
        this.state.isShowed ? this.setState({ isShowed: false }) : this.setState({ isShowed: true });
    }
    // Handling option click to put the value in the input
    optionHandler(event) {
        this.setState({
            value: event.target.innerText,
            isShowed: false
        });
        this.props.handleInputs(this.props.title, event.target.innerText);
    }
    /// Looping throu the options passed to the dropdown to use them in render
    optionsList = [];
    options() {
        this.optionsList = [];
        this.props.options.map((value, index) => {
            this.optionsList.push(<div key={index} onClick={(event) => this.optionHandler(event)} className="dropdownOption">{value}</div>);
        })
        return this.optionsList;
    }
    render() {
        return (
            <div className="dropdownInput">
                <span className="dropdownInputTitle">{this.props.title}</span>
                <input readOnly={true} value={this.state.value} onClick={this.togglerHandler} />
                <span className="border"></span>
                <div className={this.state.isShowed ? "dropdownOptions" : "dropdownOptions hidden"}>
                    {this.options()}
                </div>
            </div>
        );
    }
}
export default DropdownInput;