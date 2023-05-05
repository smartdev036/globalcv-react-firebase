import React, { Component } from 'react';
import './SimpleTextarea.scss';
class SimpleTextarea extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.adjustTextarea = this.adjustTextarea.bind(this);
    }
    handleInputChange(e) {
        this.props.handleInputs(this.props.title, e.target.value);
    }
    adjustTextarea(event){
      var windowHeight =window.innerHeight;
      var elementHeight = event.target.getBoundingClientRect().top;
      console.log(windowHeight)
      console.log(elementHeight+100)
      if( elementHeight +100 > windowHeight ){
          document.getElementById("introd").scrollBy(0,150);
      }
    }
    render() {
        return (
            <div className="simpleTextArea">
                <span className="inputTitle">{this.props.title}</span>
                <textarea onClick={(event)=>this.adjustTextarea(event)} style={{overflow:"auto"}} value={this.props.value} onChange={(event) => this.handleInputChange(event)} />
                <span className="border"></span>
            </div>
        );
    }
}
export default SimpleTextarea;