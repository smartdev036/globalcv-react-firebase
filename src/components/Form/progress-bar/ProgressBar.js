import React, {Component} from 'react'
import './ProgressBar.scss'
class ProgressBar extends Component{ 
    
    constructor(props){
        super(props);
        this.state = {
            progress:0
        }
        this.checkFullFields = this.checkFullFields.bind(this)
    
    }
    componentDidMount(){
          this.checkFullFields();
    }
    componentWillReceiveProps(){
    this.checkFullFields();
    }

    /// Check which fields are entered and generate a number ( progress )
    checkFullFields(){
        var fieldsFull = 0;
        if(this.props.values !== undefined && this.props.values !== null){
            // Looping throu the object of data , excluding the complex data ( employments educations skills    )
        for (const [key, value] of Object.entries(this.props.values)) {
           if(value !== "" && key !== "employments" && key !== "skills" && key !== "educations"&& key !== "user" && key !== "resumeName"  &&  key !== "title" &&  key !== "photo"){
               fieldsFull++
           }
       }
       }else{
           return
       }
       if(this.props.values.employments.length !== 0){
         fieldsFull++
       }
       if(this.props.values.educations !== 0){
        fieldsFull++
      }
      if(this.props.values.skills != 0){
        fieldsFull++
      }
       console.log("fields Full " +fieldsFull );

       if(fieldsFull<1){
        this.setState({progress:0});
        return
    }
       if(fieldsFull<=2){
           this.setState({progress:20});
           return
       }
       if(fieldsFull<=4){
        this.setState({progress:40});
        return
    }
    if(fieldsFull<=7){
        this.setState({progress:60});
        return
    }
    if(fieldsFull<=10){
        this.setState({progress:80});
        return
    }
    if(fieldsFull<=13){
        this.setState({progress:90});
        return
    }
    if(fieldsFull>14){
        this.setState({progress:100});
        return
    }
    }
     render(){
        return(
            <div>
                 {this.props.textHidden == false && 
                         <div className="progressLabel">
                         <span className="title">Profile Completness</span> <span style={{ color: this.state.progress > 65 ? "#2ecc71" : (this.state.progress > 30 ? "#e67e22" : (this.state.progress > 0 ? "#e74c3c" : "")) }} className="value">{this.state.progress}%</span>
                       </div>
                 }

        <div className="progressWrapper">
            <div className="progressPath">
                <div style={{
                    width:this.state.progress+"%", // Getting the propgress state from the parent component
                    // Changing the color of the progress bar based on the value provided      
                    background:  this.state.progress > 65 ?  "#2ecc71" : ( this.state.progress > 30 ? "#e67e22" : (this.state.progress >0 ? "#e74c3c":"") )
                    }} className="progressFill"></div>
            </div>
        </div>
     </div>

        );
    }
}export default ProgressBar;