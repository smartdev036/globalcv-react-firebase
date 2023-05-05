import React, { Component } from 'react';
import './BoardSelection.scss';
import { CSSTransition } from 'react-transition-group';

class BoardSelection extends Component {
  constructor(props) {
    super(props);
    this.togglerHandler = this.togglerHandler.bind(this);
    this.handleResumeClick = this.handleResumeClick.bind(this);

    this.state = {
      resumes:[{name: "1", level: "Beginner", price: localStorage.getItem("price1")},
          {name: "2", level: "Beginner", price: localStorage.getItem("price1")},
          {name: "3", level: "Beginner", price: localStorage.getItem("price1")},
          {name: "4", level: "Beginner", price: localStorage.getItem("price1")},
          {name: "5", level: "Intermediate", price: localStorage.getItem("price2")},
          {name: "6", level: "Intermediate", price: localStorage.getItem("price2")},
          {name: "7", level: "Intermediate", price: localStorage.getItem("price2")},
          {name: "8", level: "Expert", price: localStorage.getItem("price3")},
          {name: "9", level: "Expert", price: localStorage.getItem("price3")},
          {name: "10", level: "Expert", price: localStorage.getItem("price3")},
      ]};

      // let price1 = localStorage.getItem('price1');
      // this.state.resumes.map(resume=>{
      //   if(resume)
      // })

      if(localStorage.getItem('resumeInfo')==null){
        localStorage.setItem("resumeInfo", JSON.stringify(this.state.resumes))
      }   
  }

  togglerHandler() {
    this.props.toggler();
    this.props.nextStep();
  }
  handleResumeClick(resumeName,resumeLevel) {
    localStorage.setItem("cvName",resumeName);
    localStorage.setItem("cvLevel", resumeLevel);
    this.props.changeResumeName("Cv"+resumeName);

    this.props.nextStep();
  }
  render() {
    let level = localStorage.getItem('level');
    let locality = localStorage.getItem('locality');
    return (
      <div className="board">
        <button className="selecBackLink" onClick={()=>{this.props.history.push("/resume/1")}} >Back</button>
        {
          (locality !== 'India') ?
          <CSSTransition appear={true} in={true} classNames="fade" timeout={1000}>
          <div className="templateSelection">
            <h3>Templates</h3>
            <div className="templatesList"> 
              {this.state.resumes.map(res=>{
                if(res.level==level)   
                  return<div className="template"> {res.level}({res.price}$)
                          <img onClick={()=>this.handleResumeClick(+res.name,res.level)} src = {require('../../../assets/'+res.name+'.JPG') } alt="cv Preview" />
                      </div> 
                })
              }

            </div>
          </div>
        </CSSTransition>  :
        <h1 className='white'>Pending now...</h1>

        }
      </div>
    );
  };
}
export default BoardSelection;
