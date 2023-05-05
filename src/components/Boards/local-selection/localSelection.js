import React, { Component } from 'react';
import './localSelection.scss';

class LocalSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      levels:[{name: "India",key:1},
          {name: "Out of India",key:2},
      ]};
  }
  btnClick = ((level)=>{
    console.log(level)
    localStorage.setItem("locality", level);
    this.props.nextStep();
  })
  

  render() {
    return (
    <div className="board">

        <button className="selecBackLink" onClick={()=>{this.props.history.push("/resume/1")}} >Back</button>

        {
            this.state.levels.map(level=>{
                return <button  key ={level.key} onClick={()=>this.btnClick(level.name)} className="big-btn-js" level={level.name}>
                    {level.name}
                    </button>;
            })
        }
    </div>
    );
  };
}
export default LocalSelection;
