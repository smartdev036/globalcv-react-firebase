import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Welcome.scss';
import Board from '../Boards/board/board'
import Action from '../Actions/action/Action'
import { CSSTransition } from 'react-transition-group';
import { Analytics } from '../Analytics'
// Models 
import EmploymentModel from '../../models/Employment';
import EducationModel from '../../models/Education';
import LanguageModel from '../../models/Language';
import SkillModel from '../../models/Skills';
// Images 
import PreviewImg from '../../assets/preview.png'
import NextImg from '../../assets/next.png'
// Firebase
import fire from '../../conf/fire';
import { InitialisationCheck } from '../../firestore/dbOperations'
// Initialisation Component
import InitialisationWrapper from '../initailisation/initialisationWrapper/initialisationWrapper';
/// Animation Library
import { motion, AnimatePresence } from "framer-motion"
import { getPrices } from "../../firestore/dbOperations";
// This class is the source of truth. means that we will hold input states here 
class Welcome extends Component {
  constructor(props) {
    super(props);
    // This is the Parent Component that will contains all the data ( state )  of all its child component
    // From Here we will pass data to our Board Component ( Where resume is)
    // this.steps = ["Introduction","Template Level", "Locality Selection","Template Selection", "Adding Data"];
    this.steps = ["Introduction","Template Level", "Template Selection", "Adding Data"];
    this.currentResume = JSON.parse(localStorage.getItem("currentResumeItem"));
    /// Removing any nulls in the arrays of current resume
    if (this.currentResume !== null) {
      this.currentResume.employments = this.checkForNullsInArray(this.currentResume.employments, null);
      this.currentResume.educations = this.checkForNullsInArray(this.currentResume.educations, null);
      this.currentResume.skills = this.checkForNullsInArray(this.currentResume.skills, null);
    }
    
    this.state = {
      mobilePreviewOn: true,
      isMobileTogglerShowed: true,
      stepIndex: 0,
      currentStep: this.steps[0],
      user: null,
      redirect: null,
      resumeName: "Cv10",
      currentResumeName: "Cv10",
      currentResume: null,
      title: 'Untitled',
      progress: 0,
      firstname: this.currentResume != null && this.currentResume.item.firstname !== undefined ? this.currentResume.item.firstname : "",
      lastname: this.currentResume !== null && this.currentResume.item.lastname !== undefined ? this.currentResume.item.lastname : "",
      email: this.currentResume !== null && this.currentResume.item.email !== undefined ? this.currentResume.item.email : "",
      phone: this.currentResume !== null && this.currentResume.item.phone !== undefined ? this.currentResume.item.phone : "",
      occupation: this.currentResume !== null && this.currentResume.item.occupation !== undefined ? this.currentResume.item.occupation : "",
      country: this.currentResume !== null && this.currentResume.item.country !== undefined ? this.currentResume.item.country : "",
      city: this.currentResume !== null && this.currentResume.item.city !== undefined ? this.currentResume.item.city : "",
      address: this.currentResume !== null && this.currentResume.item.address !== undefined ? this.currentResume.item.address : "",
      postalcode: this.currentResume !== null && this.currentResume.item.postalcode !== undefined ? this.currentResume.item.postalcode : "",
      dateofbirth: this.currentResume !== null && this.currentResume.item.dateofbirth !== undefined ? this.currentResume.item.dateofbirth : "",
      drivinglicense: this.currentResume !== null && this.currentResume.item.drivinglicense !== undefined ? this.currentResume.item.drivinglicense : "",
      nationality: this.currentResume !== null && this.currentResume.item.nationality !== undefined ? this.currentResume.item.nationality : "",
      summary: this.currentResume !== null && this.currentResume.item.summary !== undefined ? this.currentResume.item.summary : "",
      photo: null,
      employments: this.currentResume !== null && this.currentResume.employments !== undefined ? this.currentResume.employments : [],
      educations: this.currentResume !== null && this.currentResume.educations !== undefined ? this.currentResume.educations : [],
      languages: [],
      isInitialisationShowed: false,
      skills: this.currentResume !== null && this.currentResume.skills !== undefined ? this.currentResume.skills : [],
      filledInputs: []
    }
    this.authListener = this.authListener.bind(this);
    this.nextStep = this.nextStep.bind(this)
    this.logout = this.logout.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
    this.setCurrentStep = this.setCurrentStep.bind(this);
    this.handlePreviewToggle = this.handlePreviewToggle.bind(this);
    this.createNewEmploymentObject = this.createNewEmploymentObject.bind(this);
    this.createNewEducationObject = this.createNewEducationObject.bind(this);
    this.createNewSkillObject = this.createNewSkillObject.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.changeSelectedResume = this.changeSelectedResume.bind(this);
    this.stepBack = this.stepBack.bind(this);
    this.stepFirst = this.stepFirst.bind(this);
    this.closeInitialisation = this.closeInitialisation.bind(this);
    this.checkForNullsInArray = this.checkForNullsInArray.bind(this);
    this.wrapper = React.createRef();
    this.goThirdStep = this.goThirdStep.bind(this);
    // Triggering analytics initializer with the page the visitor is in
    var AnalyticsObject = Analytics;
    AnalyticsObject("Homepage");


    // this.props.history.push("/resume/3");

  }
  /// Checking if  user is singed in
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user })
        localStorage.setItem('user', user.uid);
        if(user.uid){

        }
      } else {
        this.setState({ user: null })
        localStorage.removeItem("user");
      }
    })
  }
  // Logout
  logout() {
    fire.auth().signOut();
    localStorage.removeItem("currentResumeId");
    localStorage.removeItem("currentResumeItem");
    this.setState({
      currentStep: this.steps[0],
      stepIndex: 0,
    });
    this.currentResume = null;
  }
  // Setting the current step
  setCurrentStep(step, isLoginModalShowed) {
    this.setState({
      currentStep: this.steps[0],
      stepIndex: 0,
    });
  }
  // go to third step
  goThirdStep() {
    this.setState({
      currentStep: this.steps[4],
      stepIndex: 4,
    });
  }
  // Removing any null in employments
  checkForNullsInArray(array, elem) {
    var nullIndex = array.indexOf(elem);
    while (nullIndex > -1) {
      array.splice(nullIndex, 1);
      
      nullIndex = array.indexOf(elem);
    }
    return array;
  }
  componentDidMount() {
  }
  componentWillMount() {
    if (this.props !== undefined && this.props.match.params.step !== undefined) {
      const step_id = parseInt(this.props.match.params.step);

      if (step_id === 0) {
        this.setState({ currentStep: this.steps[0], stepIndex: 0 });
      } else if (step_id === 1) {
          this.setState({ currentStep: this.steps[1], stepIndex: 1 });
      } else if (step_id === 2) {
        this.setState({ currentStep: this.steps[2], stepIndex: 2 });
      } else if (step_id === 3) {
        this.setState({ currentStep: this.steps[3], stepIndex: 3 });
      } else {
      this.setState({ currentStep: this.steps[4], stepIndex: 4 });
      }
    }

    this.authListener();
    InitialisationCheck().then(value => {
      if (value === "none" || value === undefined) {
        this.setState({ isInitialisationShowed: true });
      }
    });
    // checking if the user clicked in a resume in dashboard, to set it as the current resume
    if (localStorage.getItem("currentResumeItem")) {
      this.setState({ currentResume: JSON.parse(localStorage.getItem("currentResumeItem")) })
    }
    /// check if the user comming from dashboard with specefic resume click
    
    // this.props.match !== undefined &&
    //   this.props.match.params.step !== undefined && this.setState({ currentStep: this.steps[2] })
  }
  // Basic Function to remove value from array
  arrayRemove(arr, value) { return arr.filter(function (ele) { return ele !== value; }); }
  // Handling navigation between Board steps
  nextStep() {
    this.setState((state) => {
      return { stepIndex: state.stepIndex + 1, currentStep: this.steps[state.stepIndex + 1], mobilePreviewOn: false }
    })
  }
  closeInitialisation() {
    this.setState((prevState, props) => ({ isInitialisationShowed: false }));
  }
  // stepBack
  stepBack() {
    this.setState((state) => {
      return { stepIndex: state.stepIndex - 1, currentStep: this.steps[state.stepIndex - 1], mobilePreviewOn: true }
    })
  }
  stepFirst() {
    this.setState((state) => {
      return { stepIndex: 0, currentStep: this.steps[0], mobilePreviewOn: true }
    })
  }
  // Create new employment object
  createNewEmploymentObject(id) {
    var employment = new EmploymentModel(id);
    this.state.employments.push(employment);
    this.setState({ employments: this.state.employments });
  }
  // Create new education object
  createNewEducationObject(id) {
    var education = new EducationModel(id);
    this.state.educations.push(education);
    this.setState({ educations: this.state.educations });
  }
  // Create new education object
  createNewLanguageObject(id) {
    var language = new LanguageModel(id);
    this.state.languages.push(language);
    this.setState({ languages: this.state.languages });
  }
  // Create new skill object
  createNewSkillObject(id) {
    var skill = new SkillModel(id);
    this.state.skills.push(skill);
    this.setState({ skills: this.state.skills });
  }
  // Handling Delete of a components/object Employment,Language,Education etc
  handleDelete(inputType, id) {
    switch (inputType) {
      case "Skills":
        this.setState({
          skills: [],
        })
        break;
      default:
        break;
    }
  }
  // Handling Inputs change from childs
  handleInputs(inputName, inputValue, idOptional, typeOptional) {
    // switching between which input is passed to the function
    // typeOptional if the input was in employment or education or langauge 
    // idOptional is an optional id when an input is inside another component like employments
    //  Each employment should contain id and when an input changed inside Employment component we need to 
    // know the id of that specefic employment to change it in here  same applicable for educations languages 
    switch (inputName) {
      case "Title":
        this.setState({ title: inputValue });
        break;
      case "First Name":
        this.setState({ firstname: inputValue });
        break;
      case "Last Name":
        this.setState({ lastname: inputValue });
        break;
      case "Email":
        this.setState({ email: inputValue });
        break;
      case "Phone":
        this.setState({ phone: inputValue });
        break;
      case "Photo":
        const image = new window.Image();
        image.src = inputValue;
        image.onload = () => {
          this.setState({ photo: image });
        };
        break;
      case "Occupation":
        this.setState({ occupation: inputValue });
        break;
      case "Country":
        this.setState({ country: inputValue });
        break;
      case "City":
        this.setState({ city: inputValue });
        break;
      case "Address":
        this.setState({ address: inputValue });
        break;
      case "Postal Code":
        this.setState({ postalcode: inputValue });
        break;
      case "Date Of Birth":
        this.setState({ dateofbirth: inputValue });
        break;
      case "Driving License":
        this.setState({ drivinglicense: inputValue });
        break;
      case "Nationality":
        this.setState({ nationality: inputValue });
        break;
      case "Professional Summary":
        this.setState({ summary: inputValue });
        break;
      case "Job Title":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        var found = false;
        // looping in state to see if its found based on the id raised from the components
        for (var i = 0; i < this.state.employments.length; i++) {
          if (this.state.employments[i] !== null && this.state.employments[i].id === idOptional && typeOptional === "Employment") {
            found = true;
            this.state.employments[i].jobTitle = inputValue;
            this.setState({ employments: this.state.employments });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEmploymentObject(idOptional);
        }
        found = false
        break;
      case "Begin":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.employments.length; i++) {
          if (this.state.employments[i] !== null && this.state.employments[i].id === idOptional && typeOptional === "Employment") {
            found = true;
            this.state.employments[i].begin = inputValue;
            this.setState({ employments: this.state.employments });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEmploymentObject(idOptional);
        }
        found = false
        break;
      case "End":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.employments.length; i++) {
          if (this.state.employments[i] !== null && this.state.employments[i].id === idOptional && typeOptional === "Employment") {
            found = true;
            this.state.employments[i].end = inputValue;
            this.setState({ employments: this.state.employments });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEmploymentObject(idOptional);
        }
        found = false
        break;
      case "Employer":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.employments.length; i++) {
          if (this.state.employments[i] !== null && this.state.employments[i].id === idOptional && typeOptional === "Employment") {
            found = true;
            this.state.employments[i].employer = inputValue;
            this.setState({ employments: this.state.employments });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEmploymentObject(idOptional);
        }
        found = false
        break;
      case "Description":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.employments.length; i++) {
          if (this.state.employments[i] !== null && this.state.employments[i].id === idOptional && typeOptional === "Employment") {
            found = true;
            this.state.employments[i].description = inputValue;
            this.setState({ employments: this.state.employments });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEmploymentObject(idOptional);
        }
        found = false
        break;
      case "School":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.educations.length; i++) {
          if (this.state.educations[i] !== null && this.state.educations[i].id === idOptional && typeOptional === "Education") {
            found = true;
            this.state.educations[i].school = inputValue;
            this.setState({ educations: this.state.educations });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEducationObject(idOptional);
        }
        found = false
        break;
      case "Degree":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.educations.length; i++) {
          if (this.state.educations[i] !== null && this.state.educations[i].id === idOptional && typeOptional === "Education") {
            found = true;
            this.state.educations[i].degree = inputValue;
            this.setState({ educations: this.state.educations });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEducationObject(idOptional);
        }
        found = false
        break;
      case "Started":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.educations.length; i++) {
          if (this.state.educations[i].id === idOptional && typeOptional === "Education") {
            found = true;
            this.state.educations[i].started = inputValue;
            this.setState({ educations: this.state.educations });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEducationObject(idOptional);
        }
        found = false
        break;
      case "Finished":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.educations.length; i++) {
          if (this.state.educations[i].id === idOptional && typeOptional === "Education") {
            found = true;
            this.state.educations[i].finished = inputValue;
            this.setState({ educations: this.state.educations });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEducationObject(idOptional);
        }
        found = false
        break;
      case "Course Description":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.educations.length; i++) {
          if (this.state.educations[i].id === idOptional && typeOptional === "Education") {
            found = true;
            this.state.educations[i].description = inputValue;
            this.setState({ educations: this.state.educations });
            break;
          }
        }
        if (found === false) {
          // create new employment
          this.createNewEducationObject(idOptional);
        }
        found = false
        break;
      case "Language":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.languages.length; i++) {
          if (this.state.languages[i].id === idOptional && typeOptional === "Languages") {
            found = true;
            this.state.languages[i].name = inputValue;
            this.setState({ languages: this.state.languages });
            break;
          }
        }
        if (found === false) {
          // create new Language
          this.createNewLanguageObject(idOptional);
        }
        found = false
        break;
      case "Level":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.languages.length; i++) {
          if (this.state.languages[i].id === idOptional && typeOptional === "Languages") {
            found = true;
            this.state.languages[i].level = inputValue;
            this.setState({ languages: this.state.languages });
            break;
          }
        }
        if (found === false) {
          // create new Language
          this.createNewLanguageObject(idOptional);
        }
        found = false
        break;
      case "Skill Name":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.skills.length; i++) {
          if (this.state.skills[i].id === idOptional && typeOptional === "Skills") {
            found = true;
            this.state.skills[i].name = inputValue;
            this.setState({ skills: this.state.skills });
            break;
          }
        }
        if (found === false) {
          // create new Language
          this.createNewSkillObject(idOptional);
        }
        found = false
        break;
      case "Rating":
        /// Check if we have any employment with th id 
        // Boolean to check if the employment is already in state
        found = false;
        // looping in state to see if its found based on the id raised from the components
        for (i = 0; i < this.state.skills.length; i++) {
          if (this.state.skills[i].id === idOptional && typeOptional === "Skills") {
            found = true;
            this.state.skills[i].rating = inputValue;
            this.setState({ skills: this.state.skills });
            break;
          }
        }
        if (found === false) {
          // create new Language
          this.createNewSkillObject(idOptional);
        }
        found = false
        break;
      default:
        break;
    }
  }
  // Handling Preview Button
  handlePreviewToggle() {
    this.state.mobilePreviewOn ? this.setState({ mobilePreviewOn: false }) : this.setState({ mobilePreviewOn: true })
    this.state.currentStep == "Introduction" ? this.setState({ isMobileTogglerShowed: false }) : this.setState({ isMobileTogglerShowed: true })
  }
  // Changing the selected resume
  changeSelectedResume(resumeName) {
    this.setState({
      resumeName: resumeName,// Propertie
      currentResumeName: resumeName
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps !== undefined && nextProps.match.params.step !== undefined) {
      const step_id = parseInt(nextProps.match.params.step);

    if (step_id === 0) {
      this.setState({ currentStep: this.steps[0], stepIndex: 0 });
    } else if (step_id === 1) {
        this.setState({ currentStep: this.steps[1], stepIndex: 1 });
    } else if (step_id === 2) {
      this.setState({ currentStep: this.steps[2], stepIndex: 2 });
    } else {
     this.setState({ currentStep: this.steps[3], stepIndex: 3 });
    }
  }

    if (nextProps.location !== this.props.location) {
      // alert(nextProps.location);
    }
  }
  
  render() {
    return (
      <div className="wrapper">

        <AnimatePresence>
          {
            this.state.isInitialisationShowed && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><InitialisationWrapper closeInitialisation={this.closeInitialisation} />  </motion.div>
          }
        </AnimatePresence>
        {/* {this.props.match.params.step != undefined && alert(this.props.match.params.step)} */}
        <div className="actions">
          <Action
            goThirdStep={this.goThirdStep}
            values={{
              user: this.state.user,
              resumeName: this.state.resumeName,
              title: this.state.title,
              firstname: this.state.firstname,
              lastname: this.state.lastname,
              summary: this.state.summary,
              occupation: this.state.occupation,
              address: this.state.address,
              postalcode: this.state.postalcode,
              country: this.state.country,
              dateofbirth: this.state.dateofbirth,
              city: this.state.city,
              email: this.state.email,
              phone: this.state.phone,
              employments: this.state.employments,
              drivinglicense: this.state.drivinglicense,
              nationality: this.state.nationality,
              educations: this.state.educations,
              languages: this.state.languages,
              skills: this.state.skills,
              photo: this.state.photo,
            }}
            setCurrentStep={this.setCurrentStep}
            redirectToDashboard={this.redirectToDashboard} logout={this.logout} user={this.state.user} handlePreviewToggle={this.handlePreviewToggle} handleDelete={this.handleDelete} progress={this.state.progress} currentStep={this.state.currentStep} handleInputs={this.handleInputs} />
        </div>
        <div className={this.state.mobilePreviewOn ? " right-panel  boardShowed" : "right-panel "}>
          <Board
            user={this.state.user}
            nextStep={this.nextStep}
            stepBack={this.stepBack}
            stepFirst={this.stepFirst}
            changeResumeName={this.changeSelectedResume}
            currentResumeName={this.state.resumeName}
            values={{
              resumeName: this.state.resumeName,
              title: this.state.title,
              firstname: this.state.firstname,
              lastname: this.state.lastname,
              summary: this.state.summary,
              occupation: this.state.occupation,
              address: this.state.address,
              postalcode: this.state.postalcode,
              country: this.state.country,
              city: this.state.city,
              dateofbirth: this.state.dateofbirth,
              drivinglicense: this.state.drivinglicense,
              email: this.state.email,
              nationality: this.state.nationality,
              phone: this.state.phone,
              employments: this.state.employments,
              educations: this.state.educations,
              languages: this.state.languages,
              skills: this.state.skills,
              photo: this.state.photo,
            }}
            currentStep={this.state.currentStep}
            history={this.props.history}
          />
        </div>
        <CSSTransition
          appear={true}
          in={true} timeout={100} classNames="previewfade">
          {this.state.isMobileTogglerShowed ? <div onClick={this.handlePreviewToggle} className="previewButton">
            <img className="previewImg" src={this.state.currentStep == "Introduction" ? NextImg : PreviewImg} alt="Preview" />
          </div> : <div></div>}
        </CSSTransition>
      </div>
    );
  }
}
export default withRouter(Welcome);
