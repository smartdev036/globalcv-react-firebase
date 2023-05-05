import React, { Component } from 'react';
import './ActionFilling.scss';
import { Analytics } from '../../Analytics';
// Configuration data
import conf from '../../../conf/configuration'
// Components Needed
import LanguagePicker from '../../Form/language-picker/LanguagePicker';
import ProgressBar from '../../Form/progress-bar/ProgressBar';
import Employment from '../../Form/employment-component/Employment';
import Education from '../../Form/education-component/Education';
import Language from '../../Form/languages-component/Languages';
import Skill from '../../Form/skill-component/Skill'
// Form Components
import SimpleInput from '../../Form/simple-input/SimpleInput';
import ImgUploadInput from '../../Form/img-upload-input/ImgUploadInput';
import SimpleTextArea from '../../Form/simple-textarea/SimpleTextarea'
//Images
import PlusIcon from '../../../assets/plus.png'
import MinusIcon from '../../../assets/minus.png'
import Ad728x90 from '../../../assets/ads/728x90.png'
import Ad300x50 from '../../../assets/ads/300x50.png'
import Toasts from '../../Toasts/Toats';
class ActionFilling extends Component {
  // Handling the state
  constructor(props) {
    super(props);
    this.state = {
      additionalDetailsShowed: false,
      //  This arrays contains the components when a user click add new employment for example
      //  we add the the components to the its specefic array , and call the array using a function 
      //   to render the number of components based on how many the user wants
      user: true,
      employments: [],
      educations: [],
      languages: [],
      skills: []
    }
    //  Binding  all functions to this context to be able to use them 
    this.aditionalDetailHandler = this.aditionalDetailHandler.bind(this);
    this.newEmploymentField = this.newEmploymentField.bind(this);
    this.newEducationField = this.newEducationField.bind(this);
    this.newLanguageField = this.newLanguageField.bind(this);
    this.newSkillField = this.newSkillField.bind(this);
    this.skillsAdded = this.skillsAdded.bind(this);
    this.handleComponentDelete = this.handleComponentDelete.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    var AnalyticsObject = Analytics;
    AnalyticsObject("Template-filling");
  }
  componentWillMount() {
    this.checkComplexFields();
  }
  // Checking if there is already some ( employments-educations-skills) in state to add them to the form 
  checkComplexFields() {
    // Cheking for employments
    if (this.props.values.employments.length > 0) {
      var jobs = []
      this.props.values.employments.map((value, index) => {
        value != null &&
          jobs.push(
            <Employment jobTitle={value.jobTitle} employer={value.employer} description={value.description} begin={value.begin} end={value.end} handleInputs={this.props.handleInputs} id={value.id} key={index} />
          );
      });
      this.setState({ employments: jobs })
    }
    // checking for educations
    if (this.props.values.educations.length > 0) {
      var educations = []
      this.props.values.educations.map((value, index) => {
        value != null &&
          educations.push(
            <Education school={value.school} degree={value.degree} started={value.started} description={value.description} finished={value.finished} id={value.id} handleInputs={this.props.handleInputs} key={index} />
          );
      });
      this.setState({ educations: educations })
    }
    // checking for educations
    if (this.props.values.skills.length > 0) {
      var skills = []
      this.props.values.skills.map((value, index) => {
        value != null &&
          skills.push(
            <Skill skillName={value.name} rating={value.rating} handleComponentDelete={this.handleComponentDelete} handleDelete={this.props.handleDelete} id={value.id} handleInputs={this.props.handleInputs} key={index} />
          );
      });
      this.setState({ skills: skills })
    }
  }
  //Handling Additional Details click and changing the state on toggler click
  aditionalDetailHandler() {
    this.state.additionalDetailsShowed ? this.setState({ additionalDetailsShowed: false }) : this.setState({ additionalDetailsShowed: true });
  }
  //  Employment History 
  employmentHistory() {
    let jobs = []
    this.state.employments.map((value, index) => {
      jobs.push(value);
    });
    return jobs;
  }
  // Add new employment field
  newEmploymentField() {
    // Giving a random id to give it to the DOM as a key y be identified , NOTE : this id is not accessable from child 
    let randomId = Math.floor(Math.random() * 9000);
    // This id is  accesable from child and we can use it as a reference to edit the employment
    let employmentId = Math.floor(Math.random() * 200);
    this.setState({
      employments: this.state.employments.concat([
        <Employment handleInputs={this.props.handleInputs} id={randomId} key={randomId} />
      ])
    });
  }
  //  Education History 
  educationHistory() {
    let educations = []
    this.state.educations.map((value, index) => {
      educations.push(value);
    });
    return educations;
  }
  // Add new education field
  newEducationField() {
    let randomId = Math.floor(Math.random() * 100);
    this.setState({
      educations: this.state.educations.concat([
        <Education id={this.state.educations.length} handleInputs={this.props.handleInputs} key={randomId} />
      ])
    });
  }
  // Add new skill field
  newSkillField() {
    let randomId = Math.floor(Math.random() * 300);
    this.setState({
      skills: this.state.skills.concat([
        <Skill handleComponentDelete={this.handleComponentDelete} handleDelete={this.props.handleDelete} id={randomId} handleInputs={this.props.handleInputs} key={randomId} />
      ])
    });
  }
  // Handling Component Delete
  handleComponentDelete(inputType, id) {
    switch (inputType) {
      case "Skills":
        this.setState({
          skills: []
        })
        break;
      default:
        break;
    }
  }
  //  Listing all skills History 
  skillsAdded() {
    let skills = []
    this.state.skills.map((value, index) => {
      skills.push(value);
    });
    return skills;
  }
  // Add new language field
  newLanguageField() {
    let randomId = Math.floor(Math.random() * 900);
    this.setState({
      languages: this.state.languages.concat([
        <Language id={this.state.languages.length} handleInputs={this.props.handleInputs} key={randomId} />
      ])
    });
  }
  //  Languages Added 
  languagesAdded() {
    let languages = []
    this.state.languages.map((value, index) => {
      languages.push(value);
    });
    return languages;
  }
  //  Handling title change , contentEditable 
  handleTitleChange(e) {
    this.props.handleInputs("Title", e.currentTarget.textContent)
  }
  render() {
    return (
      <div id="introd" className="action-introWrapper filling">
        {/* Heading of form contains Language select, Title  */}
        <div className="formHead">
          <div className="cvTitle">
            <span spellCheck="false" onBlur={this.handleTitleChange} suppressContentEditableWarning={true} contentEditable={true}>Untitled</span>
          </div>
          <LanguagePicker />
        </div>
        {/* ProgressBar */}
        <ProgressBar textHidden={false} values={this.props.values} progress={this.props.progress} />
        {/* Form */}
        <form>
          <div className="sectionHeading">
            <span className="sectionTitle">Personal Details</span>
          </div>
          <div className="grid-2-col">
            <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.firstname} title="First Name" />
            <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.lastname} title="Last Name" />
            <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.email} title="Email" />
            <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.phone} title="Phone" />
            <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.occupation} title="Occupation" description="In here you add description about hosmas ins the  tahts why you have to add it here" />
            <ImgUploadInput handleInputs={this.props.handleInputs} title="Photo" />
          </div>
          {/* Checking whate state is on additionDetails toggler */}
          <div className={this.state.additionalDetailsShowed ? "additionalnfo grid-2-col " : "additionalnfo grid-2-col hidden"}>
            <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.country} title="Country" />
            <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.city} title="City" />
            <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.address} title="Address" />
            <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.postalcode} title="Postal Code" />
            <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.dateofbirth} title="Date Of Birth" />
            <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.drivinglicense} title="Driving License" />
            <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.nationality} title="Nationality" />
          </div>
          {/* on click hide or show additional details base on the previous state*/}
          <div className="additionalDetailsToggle">
            {this.state.additionalDetailsShowed ? <img src={MinusIcon} alt="icon" /> : <img src={PlusIcon} alt="icon" />}
            <span onClick={this.aditionalDetailHandler} > {this.state.additionalDetailsShowed ? "Hide additional details" : "Show additional details"}</span>
          </div>
          {/* Professional Summary */}
          <div className="sectionHeading">
            <span className="sectionTitle">Professional Summary</span>
            <p className="sectionDescription">Quick summary about your overall experience. </p>
          </div>
          <SimpleTextArea value={this.props.values.summary} handleInputs={this.props.handleInputs} title="Professional Summary" />
          <div className="componentsWrapper">
            {/* Employment History */}
            <div className="sectionHeading">
              <span className="sectionTitle">Employment History</span>
              <p className="sectionDescription">Include you 10 last year relevant experience  and dates in this section. List your most recent  position first . </p>
            </div>
            {this.employmentHistory()}
            <div className="additionalDetailsToggle">
              <img src={PlusIcon} alt="icon" />
              <span onClick={this.newEmploymentField} > Add  job </span>
            </div>
            {/* Education History */}
            <div className="sectionHeading">
              <span className="sectionTitle">Education </span>
              <p className="sectionDescription">Include you 10 last year relevant experience  and dates in this section. List your most recent  position first . </p>
            </div>
            {this.educationHistory()}
            <div className="additionalDetailsToggle">
              <img src={PlusIcon} alt="icon" />
              <span onClick={this.newEducationField} > Add  Education </span>
            </div>
            {/* Languages History */}
            <div className="sectionHeading">
              <span className="sectionTitle">Languages </span>
              <p className="sectionDescription"> Please enter the languages you are able to work with.</p>
            </div>
            {this.languagesAdded()}
            <div className="additionalDetailsToggle">
              <img src={PlusIcon} alt="icon" />
              <span onClick={this.newLanguageField} > Add  Language </span>
            </div>
            {/* Skills */}
            <div className="sectionHeading">
              <span className="sectionTitle">Skills </span>
              <p className="sectionDescription"> Please enter your skills. and give each one a rating. </p>
            </div>
            {this.skillsAdded()}
            <div className="additionalDetailsToggle">
              <img src={PlusIcon} alt="icon" />
              <span onClick={this.newSkillField} > Add  Skill </span>
            </div>
          </div>
        </form>
      </div>);
  };
}
export default ActionFilling;
