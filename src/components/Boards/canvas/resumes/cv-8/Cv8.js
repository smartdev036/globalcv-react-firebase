import React, { Component } from 'react'
import { Stage, Layer, Rect, Circle, Image, Text, Group, Line } from 'react-konva';
import jsPDF from 'jspdf';

class URLImage extends React.Component {
    state = {
      image: null
    };
    componentDidMount() {
      this.loadImage();
    }
    componentDidUpdate(oldProps) {
      if (oldProps.src !== this.props.src) {
        this.loadImage();
      }
    }
    componentWillUnmount() {
      this.image.removeEventListener('load', this.handleLoad);
    }
    loadImage() {
      // save to "this" to remove "load" handler on unmount
      this.image = new window.Image();
      this.image.src = this.props.src;
      this.image.addEventListener('load', this.handleLoad);
    }
    handleLoad = () => {
      // after setState react-konva will update canvas and redraw the layer
      // because "image" property is changed
      this.setState({
        image: this.image
      });
      // if you keep same image object during source updates
      // you will have to update layer manually:
      // this.imageNode.getLayer().batchDraw();
    };
    render() {
      return (
        <Image
          x={this.props.x}
          y={this.props.y}
          width ={this.props.width}
          height = {this.props.height}
          image={this.state.image}

        />
      );
    }
  }

class Cv8 extends Component {
    constructor(props) {
        super(props);
        this.returnEmployments = this.returnEmployments.bind(this);
        this.checkForDownload = this.checkForDownload.bind(this);
        this.returnEducations = this.returnEducations.bind(this);
        this.returnSkills = this.returnSkills.bind(this);
        this.returnLanguages = this.returnLanguages.bind(this);
        this.state = {
            count: 0
        }
    }
    // Employments list data holders
    heighToAdd = []; // Holding the height of every employment item 
    refs = [] // Holding the reference of each employment item so we can access to its heigh seperatly
    // Educations list data holders
    educationsHeighToAdd = [];
    educationsRefs = [] // Holding the reference of each employment item so we can access to its heigh seperatly
    // Skills list data holders
    skillsHeightToAdd = [];
    skillsRefs = [];
    // Languages list data holders
    languagesHeightToAdd = [];
    languagesRefs = [];
    returnEmployments() {
        const employmentsObjects = [];
        const arraytToReturn = []
        var TotalHeightToAdd = 0;
        this.refs = Object.assign([], this.refs);// To fix Object not assignable 
        for (let index = 0; index < this.props.values.employments.length; index++) {
            if (index > 0) {
                TotalHeightToAdd = TotalHeightToAdd + this.heighToAdd[index - 1]
            }
            if (this.props.values.employments[index] !== null) {
                employmentsObjects[index] =
                {
                    item: <Group verticalAlign="top" x={TotalHeightToAdd} ref={node => { this.refs[index] = node }} >
                        <Text // Employment name and employer
                            width={100}
                            fontFamily="Poppins"
                            text={this.props.values.employments[index].jobTitle + ", " + this.props.values.employments[index].employer}
                            verticalAlign="top"
                            y={0} x={0}
                            fontSize={7}
                            fontStyle="bold"
                        />
                        <Text // employment date
                            width={100}
                            verticalAlign="top"
                            fontFamily="Poppins"
                            text={this.props.values.employments[index].begin + " - " + this.props.values.employments[index].end}
                            y={9} x={0}
                            fontSize={7}
                            fontStyle="bold"
                        />
                        <Text // Employment Description
                            width={120}
                            verticalAlign="top"
                            fontFamily="Poppins"
                            text={this.props.values.employments[index].description}
                            y={18} x={0}
                            fontSize={7}
                        />
                    </Group>,
                    height: index > 0 ? this.heighToAdd[index - 1] : 0
                }
                this.refs[index] != undefined ? this.heighToAdd[index] = 130: this.heighToAdd[index] = 0;
                arraytToReturn.push(employmentsObjects[index].item);
            }
        }
        return arraytToReturn;
    }
    returnEducations() {
    const educationsObjects = [];
    var arraytToReturn = [];
    var TotalHeightToAdd = 30; // give it a 30 because the heading of educations is 30 so we  need to move the educations down by 30px 
    this.educationsRefs = Object.assign([], this.educationsRefs);// To fix Object not assignable 
    for (let index = 0; index < this.props.values.educations.length; index++) {
        if (index > 0) {
            TotalHeightToAdd = TotalHeightToAdd + this.educationsHeighToAdd[index - 1]
        }
        if (this.props.values.educations[index] !== null) {
            educationsObjects[index] = {
                item: <Group verticalAlign="top" x={20} y={parseInt(TotalHeightToAdd)} ref={node => { this.educationsRefs[index] = node }} >
                        <Text // Employment name and employer
                            width={100}
                            fontFamily="Poppins"
                            text={this.props.values.educations[index].school+". "+this.props.values.educations[index].degree}
                            verticalAlign="top"
                            y={0} x={0}
                            fontSize={7}
                            fontStyle="bold"
                        />
                        <Text // employment date
                            width={100}
                            verticalAlign="top"
                            fontFamily="Poppins"
                            text={this.props.values.educations[index].started + " - " + this.props.values.educations[index].finished}
                            x={80}
                            fontSize={7}
                            fontStyle="bold"
                        />
                        <Text // Employment Description
                            width={160}
                            verticalAlign="top"
                            fontFamily="Poppins"
                            text={this.props.values.educations[index].description}
                            y={9} x={0}
                            fontSize={7}
                        />
                </Group>,
                height: index > 0 ? this.educationsHeighToAdd[index - 1] : 0
            }
            this.educationsRefs[index] != undefined ? this.educationsHeighToAdd[index] = parseInt(this.educationsRefs[index].getClientRect().height) +10: this.educationsHeighToAdd[index] = 0;
            arraytToReturn.push(educationsObjects[index].item)
        }
    }
    return arraytToReturn;
}

    returnSkills() {
        var skillsObjects = [];
        var arrayToReturn = [];
        var TotalHeightToAdd = 0;
        this.skillsRefs = Object.assign([], this.skillsRefs);
        for (let index = 0; index < this.props.values.skills.length; index++) {
            if (index > 0) {
                TotalHeightToAdd = TotalHeightToAdd + this.skillsHeightToAdd[index - 1] + 5
            }
            skillsObjects[index] = {
                item:
                    <Group y={parseInt(TotalHeightToAdd)} ref={node => { this.skillsRefs[index] = node }} >
                        <Rect x={14} y={2} fill="black" height={2} width={2} />
                        <Text x={20} fontFamily="Poppins" fontSize={7} y={0} width={283} text={this.props.values.skills[index] !== null ? this.props.values.skills[index].name : ""} />
                        <Rect x={20} y={8}  fill="black" height={2} width={this.props.values.skills[index] != undefined ? this.props.values.skills[index].rating*1.5 : 0} />
                    </Group>
                ,
                height: index > 0 ? this.educationsHeighToAdd[index - 1] : 0,
            }
            this.skillsRefs[index] != undefined ? this.skillsHeightToAdd[index] = parseInt(this.skillsRefs[index].getClientRect().height) : this.skillsHeightToAdd[index] = 0
            arrayToReturn.push(skillsObjects[index].item);
        }
        return arrayToReturn;
    }
    returnLanguages() {
        var languagesObjects = [];
        var arrayToReturn = [];
        var TotalHeightToAdd = 10;
        this.languagesRefs = Object.assign([], this.languagesRefs);
        for (let index = 0; index < this.props.values.languages.length; index++) {
            if (index > 0) {
                TotalHeightToAdd = TotalHeightToAdd + this.languagesHeightToAdd[index - 1]
            }
            languagesObjects[index] = {
                item: <Group y={TotalHeightToAdd} ref={node => { this.languagesRefs[index] = node }} >
                    <Text
                        text={this.props.values.languages[index].name}
                        width = {70}
                        fontSize={8}
                        fontStyle="bold"
                        lineHeight={1.4}
                        fontFamily="Poppins"
                    />
                    <Text
                        x={54}
                        text={this.props.values.languages[index].level}
                        lineHeight={1.4}
                        fontSize={8}
                        fontFamily="Poppins"
                    />
                </Group>
                ,
                height: index > 0 ?4 + this.languagesHeightToAdd[index - 1] : 0,
            }
            this.languagesRefs[index] != undefined ? this.languagesHeightToAdd[index] = parseInt(this.languagesRefs[index].getClientRect().height) : this.languagesHeightToAdd[index] = 0
            arrayToReturn.push(languagesObjects[index].item);
        }
        return arrayToReturn;
    }
    checkForDownload() {
        var dataUrl = this.stageRef.getStage().toDataURL({ pixelRatio: 4, y: 0 });
        var doc = new jsPDF("p", "mm", "a4");
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();
        const pdf = new jsPDF();
        pdf.addImage(dataUrl, 'JPEG', 0, 0, width, height);
        pdf.save("Resume" + ".pdf");
        this.props.downloadEnded()
        if (this.props.pages > 1) {
            var dataUrl = this.stageRef.getStage().toDataURL({ pixelRatio: 3, y: 637 });
            var doc = new jsPDF("p", "mm", "a4");
            var width = doc.internal.pageSize.getWidth();
            var height = doc.internal.pageSize.getHeight();
            const pdf = new jsPDF();
            pdf.addImage(dataUrl, 'JPEG', 0, 0, width, height);
            pdf.save("Resume_Page_2" + ".pdf");
        }
    }
    componentDidUpdate() {
        if (this.layer != undefined) {
            if (parseInt(this.layer.getClientRect().height) > 620 && this.props.pages == 1) {
                this.props.addPage();
            }
        }
        // Checking when download is clicked and trigger a download 
        this.props.triggerDownload == true && this.checkForDownload()
    }
    //                 <URLImage src="/faceBg1.png"/>

    render() {
        return         <Stage width={470} height={640} ref={node => { this.stageRef = node }}>
        <Layer y={this.props.currentPage > 1 ? -650 : 0} x={0} ref={node => { this.layer = node }}>
        <Group>
            {/* Background rects */}
            <URLImage x={0} y={0} width={470} height={640} src="/bg8.png"  />
        </Group>
        <Group ref={node => { this.headRef = node }} >
            {/* First Name & SurName */}
                <Text width={470} y="37" align = 'center' fontFamily="Poppins" fontStyle="bold" text={this.props.values.firstname+" "+this.props.values.lastname} fontSize={40} ref={node => { this.firstnameRef = node }}/>
                {(this.props.values.firstname.length != 0 && this.props.values.lastname.length != 0)?            
                    <Text width={470} y="115" align = 'center' fontFamily="Poppins" fontStyle="bold" text={this.props.values.firstname[0]+this.props.values.lastname[0]} fontSize={27} ref={node => { this.firstnameRef = node }}/>
                : 
                    <Group>
                        {/* <Text width={168} align = 'center' fontFamily="Poppins" text={"Last Job "} y={192} fontSize={10}  fill = 'white' />  */}
                    </Group>
                }
                <Text width={470} align = 'center' fontFamily="Poppins" fontStyle='bold' text="PROFESSIONAL SUMMARY" y={172} fontSize={14}/> 
        </Group>

        {/* About Me  */}
            {/* Professional Summary Start   */}
            <Text
                x={60}
                y={190} 
                width={362}
                ref={node => { this.summaryRef = node }}
                fontFamily="Poppins"
                align='center'
                text={this.props.values.summary}
                lineHeight="1.2"
                fontSize={9}
                fill="black"
            />
            {/* Professional Summary  End */}


            {/* Skills */}
            <Group ref={node => { this.skRefs = node }}  
            x ={250} y={318} >
                <Text
                fontFamily="Poppins"
                fontStyle="bold"
                fill="black"
                text="EXPERTISE"
                align='center'
                y={18} 
                width={168}
                height={20}
                fontSize={14}
                />                
                <Group x={10} y={41}>
                    {this.returnSkills()}
                </Group>
            </Group>

        
        <Group>
        <Text 
            fontFamily="Poppins"
            fontStyle="bold"
            fill="black"
            text="CONTACT INFORMATION"
            align='center'
            y={264} 
            width={470}
            height={20}
            fontSize={14}
        />
        <Text 
            fontFamily="Poppins"
            fontStyle="bold"
            text="PHONE"
            align='left'
            y={283} 
            x={75}
            height={20}
            fontSize={10}
            fill="white"
        />
        <Text 
            fontFamily="Poppins"
            fontStyle="bold"
            text="EMAIL"
            align='left'
            y={283} 
            x={225}
            height={20}
            fontSize={10}
            fill="white"
        />
        <Text 
            fontFamily="Poppins"
            fontStyle="bold"
            text="ADDRESS"
            align='left'
            y={283} 
            x={355}
            height={20}
            fontSize={10}
            fill="white"
        />
        {/* Info Content Start  */}       
        {/* { this.props.values.address? */}
        <Group y={296}  ref={node => { this.infoHeight = node }} >
                {/* Address */}
                <Text  ref={node => { this.addressRef = node }}
                    width={120}
                    fontFamily="Poppins"
                    text={this.props.values.address}
                    // text={'this.props.values.address'}
                    lineHeight="1.3"
                    x={320}
                    align="center"
                    fontSize={8}
 
                    onDragStart={() => {
                        this.setState({
                            phone: {
                                isDragging: true
                            }
                        });
                    }}
                    onDragEnd={e => {
                        this.setState({
                            phone: {
                                isDragging: false,
                                x: e.target.x(),
                                y: e.target.y()
                            }
                        });
                    }}
                />
                {/* Info Title  */}

                <Text
                    ref={node => { this.phoneRef = node }}
                    width={120}
                    fontFamily="Poppins"
                    text={this.props.values.phone}
                    lineHeight="1.3"
                    x={30}
                    align="center"
                    fontSize={8}
 
                    onDragStart={() => {
                        this.setState({
                            phone: {
                                isDragging: true
                            }
                        });
                    }}
                    onDragEnd={e => {
                        this.setState({
                            phone: {
                                isDragging: false,
                                x: e.target.x(),
                                y: e.target.y()
                            }
                        });
                    }}
                />
                {/* Email */}
                <Group >
                <Text
                    ref={node => { this.emailRef = node }}
                    width={120}
                    fontFamily="Poppins"
                    text={this.props.values.email}
                    lineHeight="1.3"
                    fontSize={8}
                    align="center" 
                    x={180}
                    onDragStart={() => {
                        this.setState({
                            phone: {
                                isDragging: true
                            }
                        });
                    }}
                    onDragEnd={e => {
                        this.setState({
                            phone: {
                                isDragging: false,
                                x: e.target.x(),
                                y: e.target.y()
                            }
                        });
                    }}
                />
                </Group>
                {/* Email */}
        </Group>
    </Group>



            {/* Right Side */}
            {/* Experience */}
            <Group 
            ref={node => { this.empRefs = node }}
            x ={150} y={503} >
                <Text
                    width={300}
                    fontFamily="Poppins"
                    fontStyle="bold"
                    text="PROFESSIONAL EXPERIENCE"
                    y={0} x={0}
                    fontSize={14}
                />
                <Group y={35} x={-95}>
                {this.returnEmployments()}
                </Group>
            </Group>
            {/* Education History Start   */}

            {/* Education */}
            <Group 
            ref={node => { this.eduRefs = node }}
            x ={85} 
            y={335} >
                <Text
                    width={100}
                    fontFamily="Poppins"
                    text="EDUCATION"
                    y={0} x={0}
                    fontSize={14}
                    fontStyle="bold"
                />
                <Group x={-65} y={-5}>
                {this.returnEducations()}
                </Group>
            </Group>
            {/* Education History Start   */}
        </Layer>
    </Stage>
    }
}
export default Cv8;