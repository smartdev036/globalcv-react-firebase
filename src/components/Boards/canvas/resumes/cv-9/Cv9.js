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

class Cv9 extends Component {
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
        var TotalHeightToAdd = 20;
        this.refs = Object.assign([], this.refs);// To fix Object not assignable 
        for (let index = 0; index < this.props.values.employments.length; index++) {
            if (index > 0) {
                TotalHeightToAdd = TotalHeightToAdd + this.heighToAdd[index - 1]
            }
            if (this.props.values.employments[index] !== null) {
                employmentsObjects[index] =
                {
                    item: <Group verticalAlign="top" x = {20} y={TotalHeightToAdd} ref={node => { this.refs[index] = node }} >
                        <Text // Employment name and employer
                            width={200}
                            fontFamily="Poppins"
                            text={this.props.values.employments[index].jobTitle+". "+this.props.values.employments[index].employer}
                            verticalAlign="top"
                            y={4} x={0}
                            fontSize={7}
                            fontStyle="bold"
                        />
                        <Text // employment date
                            width={40}
                            verticalAlign="top"
                            fontFamily="Poppins"
                            text={this.props.values.employments[index].begin+". "+this.props.values.employments[index].end}
                            y={4} x={120}
                            fontSize={7}
                            fontStyle="bold"
                        />
                        <Text // Employment Description
                            verticalAlign="top"
                            fontFamily="Poppins"
                            text={this.props.values.employments[index].description}
                            fontSize={7}
                            width={160}
                            y={15} x={0}
                            lineHeight={1.4}
                        />
                    </Group>,
                    height: index > 0 ? this.heighToAdd[index - 1] : 0
                }
                this.refs[index] != undefined ? this.heighToAdd[index] = parseInt(this.refs[index].getClientRect().height) + 15: this.heighToAdd[index] = 0;
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
                    <Text // School
                        width={200}
                        fontFamily="Poppins"
                        text={this.props.values.educations[index].school+". "+this.props.values.educations[index].degree}
                        verticalAlign="top"
                        y={4} x={0}
                        fontSize={7}
                        fontStyle="bold"
                    />
                    <Text // Degree
                        width={40}
                        verticalAlign="top"
                        fontFamily="Poppins"
                        text={this.props.values.educations[index].started+". "+ this.props.values.educations[index].end}
                        y={4} x={120}
                        fontSize={7}
                        fontStyle="bold"
                    />
                    <Text // Employment Description
                        verticalAlign="top"
                        fontFamily="Poppins"
                        text={this.props.values.educations[index].description}
                        width={160}
                        y={15} x={0}
                        lineHeight = {1.4}
                        fontSize={7}
                    />
                </Group>,
                height: index > 0 ? this.educationsHeighToAdd[index - 1] : 0
            }
            this.educationsRefs[index] != undefined ? this.educationsHeighToAdd[index] = parseInt(this.educationsRefs[index].getClientRect().height) +15: this.educationsHeighToAdd[index] = 0;
            arraytToReturn.push(educationsObjects[index].item)
        }
    }
    return arraytToReturn;
}

    returnSkills() {
        const skillsObject = [];
        const arrayToReturn = [];
        var numberInLine = 1;
        var heightToAdd = 25;
        for (let index = 0; index < this.props.values.skills.length; index++) {
            skillsObject[index] = {
                item: <Group y={heightToAdd} x={10} >
                    <Text fontFamily="Georgia" lineHeight={1.4} align='right' fontStyle='bold' width={150}
                    fill="black" fontSize={9} x={0} y={0} text={this.props.values.skills[index].name} />
                </Group>
            }
            numberInLine = numberInLine +1;
            heightToAdd = heightToAdd + 15;
            arrayToReturn.push(skillsObject[index].item)
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
                        x={74}
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
        return  <Stage width={470} height={640} ref={node => { this.stageRef = node }}>
        <Layer y={this.props.currentPage > 1 ? -650 : 0} x={0} ref={node => { this.layer = node }}>
        <Group>
            {/* Background rects */}
            <URLImage x={0} y={0} width={470} height={640} src="/bg9.png"  />
            {/* <Rect width={470} height={640} fill="#f2f2f2" x={0}></Rect> */}
        </Group>
        <Group  x={22} ref={node => { this.headRef = node }} >
            {/* First Name & SurName */}
            <Group x={240} y={-77}>
                <Text width={200} align = 'left' fontFamily="Poppins" text={this.props.values.firstname} y={140} fontSize={30} ref={node => { this.firstnameRef = node }} fill="white"/>
                <Text width={200} align = 'left' fontFamily="Poppins" fontStyle="bold" text={this.props.values.lastname} y={168} fontSize={30} ref={node => { this.lastnameRef = node }} fill = 'white' /> 
            </Group>
        <Circle x={143} y={86} radius={50} fill="white" />
        {this.props.values.photo != null ?
                <Group>
                    <Image x={93} y={36} width={100} height={100}  image={this.props.values.photo} ></Image> 
                </Group>    
                    : 
                <Group>
                    {/* Image Rect */}
                </Group>
            }
        </Group>
        <URLImage  x={115} y={36} width={100} height={100}  src="/faceBg9.png"  />

        {/* About Me  */}
            <Text
                fontFamily="Poppins"
                fontStyle="bold"
                text="ABOUT ME"
                align='right'
                fill="#e9581b"
                x={22}
                y={163} 
                width={168}
                height={20}
                fontSize={16}
            />
            {/* Professional Summary Start   */}
            <Text
                x={22}
                y={183} 
                width={168}
                align='right'
                ref={node => { this.summaryRef = node }}
                fontFamily="Poppins"
                text={this.props.values.summary}
                lineHeight="1.3"
                fontSize={9}
                fill="black"
            />
            {/* Professional Summary  End */}


            {/* Skills */}
            <Group ref={node => { this.skRefs = node }}  
            x ={22} y={276}>
                {/*  y={this.summaryRef ?this.summaryRef.getClientRect().height + 264 : 276}  */}
                <Text
                fontFamily="Poppins"
                fontStyle="bold"
                fill="#e9581b"
                text="EXPERTISE"
                align='right'
                x={0}
                y={0} 
                width={168}
                height={20}
                fontSize={16}
                />
                
                <Group x={10}>
                    {this.returnSkills()}
                </Group>
            </Group>

        
        <Group y = {420}>
        {/* <Group y = {this.skRefs ?this.summaryRef.getClientRect().height + this.skRefs.getClientRect().height + 334 : 366}> */}
        <Text 
            fontFamily="Poppins"
            fontStyle="bold"
            text="CONTACT"
            align='right'
            fill="#e9581b"
            x={52}
            width={168}
            height={20}
            fontSize={16}
        />
        {/* Info Content Start  */}       
        {/* { this.props.values.address? */}
        <Group y={40}  ref={node => { this.infoHeight = node }} x={100}>
                {/* Address */}

                <URLImage y={0} x={30} width={15} height={15} src="/location.png"  />

                {/* Address */}
                <Text  ref={node => { this.addressRef = node }}
                    width={120}
                    fontFamily="Poppins"
                    text={this.props.values.address}
                    lineHeight="1.3"
                    x={53}
                    y ={3}
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

                {/* Phone */}
                <URLImage 
                    y={this.addressRef ?  + this.addressRef.getClientRect().height +15: 25} 
                    x={30}
                    width={15} height={15} src="/phone.png"  />
                {/* Phone */}
                <Text
                    ref={node => { this.phoneRef = node }}
                    width={120}
                    fontFamily="Poppins"
                    text={this.props.values.phone}
                    lineHeight="1.3"
                    x={53}
                    fontSize={8}
                    y={this.addressRef ?  + this.addressRef.getClientRect().height +18: 28} 
 
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
                <URLImage 
                    y={this.phoneRef ? 35 + this.addressRef.getClientRect().height+this.phoneRef.getClientRect().height  : 55}
                    x={30}
                    width={17} height={15} src="/mail.png"  />
                {/* Phone */}
                {/* Email */}
                <Text
                    ref={node => { this.emailRef = node }}
                    width={120}
                    fontFamily="Poppins"
                    text={this.props.values.email}
                    lineHeight="1.3"
                    y={this.phoneRef ? 38 + this.addressRef.getClientRect().height+this.phoneRef.getClientRect().height  : 55}
                    x={53}
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
                </Group>
                {/* Email */}
        </Group>
    </Group>



            {/* Right Side */}
            {/* Experience */}
            <Group 
            ref={node => { this.empRefs = node }}
            x={240}
            y={163} 
>
                <Text
                    width={200}
                    fontFamily="Poppins"
                    fontStyle="bold"
                    fill="#e9581b"
                    text="WORK"
                    y={0} x={20}
                    fontSize={16}
                />
                {this.returnEmployments()}
            </Group>
            {/* Education History Start   */}

            {/* Education */}
            <Group 
            ref={node => { this.eduRefs = node }}
            x ={260} 
            y={370} >
                <Text
                    width={300}
                    fontFamily="Poppins"
                    fill="#e9581b"
                    text="EDUCATION"
                    y={0} x={20}
                    fontSize={14}
                    fontStyle="bold"
                />
                <Group >
                    {this.returnEducations()}
                </Group>
            </Group>
            {/* Education History Start   */}
        </Layer>
    </Stage>
    }
}
export default Cv9;