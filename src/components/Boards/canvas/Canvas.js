/*  This is  a  canvaas that will wrap all our templates. 
     Building a resume  template is basically drawing a template in a canvas then passing the props (user inputs)
     In order to build templates fast we used KonvaJS Library.
     Please take a look in their documentation where you will understand all the code bellow and how the templates are made
*/
import React, { Component } from 'react'
import Cv1 from './resumes/cv-1/Cv1';
import Cv2 from './resumes/cv-2/Cv2';
import Cv3 from './resumes/cv-3/Cv3';
import Cv4 from './resumes/cv-4/Cv4';
import Cv5 from './resumes/cv-5/Cv5';
import Cv6 from './resumes/cv-6/Cv6';
import Cv7 from './resumes/cv-7/Cv7';
import Cv8 from './resumes/cv-8/Cv8';
import Cv9 from './resumes/cv-9/Cv9';
import Cv10 from './resumes/cv-10/Cv10';
class Canvas extends Component {
    constructor(props) {
        super(props);
        this.currentHeight = 0;
    }
    render() {
        return (
            <div>
                {              
        this.props.currentResumeName == "Cv1" ?
        <Cv1 currentPage={this.props.currentPage} pages={this.props.pages} addPage={this.props.addPage} downloadEnded={this.props.downloadEnded} triggerDownload={this.props.triggerDownload} values={this.props.values} /> 
        :
        this.props.currentResumeName == "Cv2" ?
        <Cv2  initialisePages={this.props.initialisePages} pages={this.props.pages} addPage ={this.props.addPage} downloadEnded={this.props.downloadEnded} triggerDownload={this.props.triggerDownload} currentPage={this.props.currentPage} values = {this.props.values} /> 
        :
        this.props.currentResumeName == "Cv3" ?
        <Cv3  initialisePages={this.props.initialisePages} pages={this.props.pages} addPage ={this.props.addPage} downloadEnded={this.props.downloadEnded} triggerDownload={this.props.triggerDownload} currentPage={this.props.currentPage} values = {this.props.values} /> 
        :  
        this.props.currentResumeName == "Cv4" ? 
        <Cv4  initialisePages={this.props.initialisePages} pages={this.props.pages} addPage ={this.props.addPage} downloadEnded={this.props.downloadEnded} triggerDownload={this.props.triggerDownload} currentPage={this.props.currentPage} values = {this.props.values} /> 
        :  
        this.props.currentResumeName == "Cv5" ? 
        <Cv5  initialisePages={this.props.initialisePages} pages={this.props.pages} addPage ={this.props.addPage} downloadEnded={this.props.downloadEnded} triggerDownload={this.props.triggerDownload} currentPage={this.props.currentPage} values = {this.props.values} /> 
        :  
        this.props.currentResumeName == "Cv6" ? 
        <Cv6  initialisePages={this.props.initialisePages} pages={this.props.pages} addPage ={this.props.addPage} downloadEnded={this.props.downloadEnded} triggerDownload={this.props.triggerDownload} currentPage={this.props.currentPage} values = {this.props.values} /> 
        :  
        this.props.currentResumeName == "Cv7" ? 
        <Cv7  initialisePages={this.props.initialisePages} pages={this.props.pages} addPage ={this.props.addPage} downloadEnded={this.props.downloadEnded} triggerDownload={this.props.triggerDownload} currentPage={this.props.currentPage} values = {this.props.values} /> 
        :  
        this.props.currentResumeName == "Cv8" ? 
        <Cv8  initialisePages={this.props.initialisePages} pages={this.props.pages} addPage ={this.props.addPage} downloadEnded={this.props.downloadEnded} triggerDownload={this.props.triggerDownload} currentPage={this.props.currentPage} values = {this.props.values} /> 
        :  
        this.props.currentResumeName == "Cv9" ? 
        <Cv9  initialisePages={this.props.initialisePages} pages={this.props.pages} addPage ={this.props.addPage} downloadEnded={this.props.downloadEnded} triggerDownload={this.props.triggerDownload} currentPage={this.props.currentPage} values = {this.props.values} /> 
        :  
        this.props.currentResumeName == "Cv10" && 
        <Cv10  initialisePages={this.props.initialisePages} pages={this.props.pages} addPage ={this.props.addPage} downloadEnded={this.props.downloadEnded} triggerDownload={this.props.triggerDownload} currentPage={this.props.currentPage} values = {this.props.values} /> 
          
          } 
                
            </div>
        )
    }
}
export default Canvas;