import React,{Component} from 'react';
import './SimpleInput.scss';
class SimpleInput extends Component{
constructor(props){
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
}
  handleInputChange(e){
    this.props.handleInputs(this.props.title,e.target.value);
  }
 render(){
     return(
         <div className="simpleInput">
             <span className="inputTitle">{this.props.title}</span>
             <input type={this.props.type == "Password" ? "password":""} style={{backgroundColor:this.props.bg ? this.props.bg : ""}} disabled={this.props.disabled ? true : false} value={this.props.value} placeholder={this.props.placeholder ? this.props.placeholder : ""}  onChange={this.handleInputChange}/>
             <span className="border"></span>
         </div>
     );
 }
}
export default SimpleInput;