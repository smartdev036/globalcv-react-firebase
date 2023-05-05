import React, { Component } from 'react';
import './BoardLevel.scss';
class BoardLevel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      levels:[{name: "Beginner",price: localStorage.getItem("price1")},
          {name: "Intermediate", price: localStorage.getItem("price2")},
          {name: "Expert", price: localStorage.getItem("price3")},
      ]};
  }
  btnClick = ((level)=>{
    console.log(level)
    localStorage.setItem("level", level);
    this.props.nextStep();
  })
  

  render() {
    return (
    <div className="board">
        <button className="selecBackLink" onClick={()=>{this.props.history.push("/resume/0")}} >Back</button>

        {
            this.state.levels.map(level=>{
                return <button  key ={level.price} onClick={()=>this.btnClick(level.name)} className="big-btn-js" level={level.name}>
                    {level.name}
                    </button>;
            })
        }
    </div>
    );
  };
}
export default BoardLevel;
