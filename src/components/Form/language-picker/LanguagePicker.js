import React, { Component } from 'react';
import './LanguagePicker.scss'
import UsFlag from '../../../assets/countries/united-states.png'
import DenmarkFlag from '../../../assets/countries/denmark.png'
import SwedenFlag from '../../../assets/countries/sweden.png'
import SpainkFlag from '../../../assets/countries/spain.png'
import RussianFlag from '../../../assets/countries/russia.png'
import FranceFlag from '../../../assets/countries/france.png'
class LanguagePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: "false",
        }
        // Binding the function to this 
        this.handleClick = this.handleClick.bind(this);
    }
    // Handling the click on the language button to open/hide dropdown based on the state isOpen
    handleClick() {
        this.state.isOpen === "true" ? this.setState({ isOpen: "false" }) : this.setState({ isOpen: "true" });
    }
    render() {
        return (
            <div className="languagePickerWrapper">
                {/* Current Language */}
                <div className="languagePicker">
                    <img src={UsFlag} alt="us" />
                    <span onClick={this.handleClick} className="language">English</span>
                </div>
                {/* Language Dropdown */}
                <div className={this.state.isOpen === "true" ? 'languageDropdown' : 'languageDropDown hidden'}>
                    <ul>
                        {/* Language item */}
                        <li className="languagePicker" >
                            <img src={DenmarkFlag} alt="danish" />
                            <span className="language" >Danish</span>
                        </li>
                        {/* Language item */}
                        <li className="languagePicker" >
                            <img src={SwedenFlag} alt="swedish" />
                            <span className="language">Swedish</span>
                        </li>
                        {/* Language item */}
                        <li className="languagePicker" >
                            <img src={SpainkFlag} alt="spanish" />
                            <span className="language" >Spanish</span>
                        </li>
                        {/* Language item */}
                        <li className="languagePicker" >
                            <img src={RussianFlag} alt="russian" />
                            <span className="language" >Russian</span>
                        </li>
                        {/* Language item */}
                        <li className="languagePicker" >
                            <img src={FranceFlag} alt="french" />
                            <span className="language">French</span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default LanguagePicker;