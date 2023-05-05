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

class Cv6 extends Component {
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
                        <Rect height={1} width={200}>
                        </Rect>
                        <Text // Employment name and employer
                            width={200}
                            fontFamily="Poppins"
                            text={this.props.values.employments[index].jobTitle + ", " + this.props.values.employments[index].employer}
                            verticalAlign="top"
                            y={4} x={0}
                            fontSize={7}
                            fontStyle="bold"
                        />
                        <Text // employment date
                            width={200}
                            verticalAlign="top"
                            fontFamily="Poppins"
                            text={this.props.values.employments[index].begin + " - " + this.props.values.employments[index].end}
                            y={4} x={150}
                            fontSize={7}
                            fontStyle="bold"
                        />
                        <Text // Employment Description
                            width={245}
                            verticalAlign="top"
                            fontFamily="Poppins"
                            text={this.props.values.employments[index].description}
                            y={15} x={0}
                            fontSize={7}
                            lineHeight={1.4}
                        />
                    </Group>,
                    height: index > 0 ? this.heighToAdd[index - 1] : 0
                }
                this.refs[index] != undefined ? this.heighToAdd[index] = parseInt(this.refs[index].getClientRect().height) : this.heighToAdd[index] = 0;
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
                    item: <Group verticalAlign="top" y={parseInt(TotalHeightToAdd)} ref={node => { this.educationsRefs[index] = node }} >
                        <Rect height={4} width={200} y={260}>
                        </Rect>
                        <Text // Employment name and employer
                            width={200}
                            fontFamily="Poppins"
                            text={this.props.values.educations[index].degree + ", " + this.props.values.educations[index].school}
                            verticalAlign="top"
                            y={267} x={120}
                            fontSize={7}
                            fontStyle="bold"
                        />
                        <Text // employment date
                            width={220}
                            verticalAlign="top"
                            fontFamily="Poppins"
                            text={this.props.values.educations[index].started + " - " + this.props.values.educations[index].finished}
                            y={267} x={270}
                            fontSize={7}
                            fontStyle="bold"
                        />
                        <Text // Employment Description
                            width={245}
                            verticalAlign="top"
                            fontFamily="Poppins"
                            text={this.props.values.educations[index].description}
                            y={277} x={120}
                            lineHeight = {1.4}
                            fontSize={7}
                        />
                    </Group>,
                    height: index > 0 ? this.educationsHeighToAdd[index - 1] : 0
                }
                this.educationsRefs[index] != undefined ? this.educationsHeighToAdd[index] = parseInt(this.educationsRefs[index].getClientRect().height) : this.educationsHeighToAdd[index] = 0;
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
                item: <Group y={heightToAdd} x={numberInLine == 1 ? 40 : 160}>
                    <Circle y={7} width={3} fill="#3B3B3B" />
                    <Text fontFamily="Georgia" lineHeight={1.4} 
                    fill="#3B3B3B" fontSize={9} x={5} y={0} text={this.props.values.skills[index].name} />
                </Group>
            }
            numberInLine == 2 ? numberInLine = 1 : numberInLine = numberInLine + 1;
            index%2 == 1 ? heightToAdd = heightToAdd + 15 : heightToAdd = heightToAdd;
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
        return         <Stage width={470} height={640} ref={node => { this.stageRef = node }}>
        <Layer y={this.props.currentPage > 1 ? -650 : 0} x={0} ref={node => { this.layer = node }}>
        <Group>
            {/* Background rects */}
            <Rect width={470} height={640} fill="#f2f2f2" x={0}></Rect>
            <Rect width={180} height={30} fill="#376193"></Rect>
            <Rect width={290} height={30} fill="#376193" x={180} y = {610}></Rect>
        </Group>
        <Group ref={node => { this.headRef = node }} >
            {/* First Name & SurName */}
            <Text width={180} align = 'center' fontFamily="Poppins" fontStyle="bold" text={this.props.values.firstname} y={45}  fontSize={20} ref={node => { this.firstnameRef = node }} fill="#376193"/>
            <Text width={180} align = 'center' fontFamily="Poppins" fontStyle="bold" text={this.props.values.lastname} y={75} fontSize={20} ref={node => { this.lastnameRef = node }} fill = '#376193' /> 
            {this.props.values.photo != null ?
                <Group>
                    <Image x={10} y={105} height={120} width={160}  image={this.props.values.photo} ></Image> 
                </Group>    
                    : 
                <Group>
                    {/* Image Rect */}
                    <Rect stroke="#080808" height={120} width={160} x={10} y={106} strokeWidth={1} />
                </Group>
            }
        </Group>
        <URLImage src="/faceBg1.png"  x={10} y={105} height={120} width={160} />

        <Text
            width={300}
            fontFamily="Poppins"
            fontStyle="bold"
            text="Contact"
            y={250} x={30}
            fontSize={15}
            fill="#376193"
        />
        <Rect
            height={2}
            width={130}
            fill="#555"
            y={265} x={30}
        />
        {/* Info Content Start  */}
        
        {/* { this.props.values.address? */}
        <Group y={280}  ref={node => { this.infoHeight = node }} >
                {/* Address */}
                <Text
                    width={130}
                    fontFamily="Poppins"
                    fontStyle="bold"
                    text="Address: "
                    y={0} x={30}
                    fontSize={9}
                />

                {/* Address */}
                <Text  ref={node => { this.addressRef = node }}
                    width={120}
                    fontFamily="Poppins"
                    text={this.props.values.address}
                    lineHeight="1.3"
                    x={30}
                    y ={13}
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
                <Text
                    width={300}
                    fontFamily="Poppins"
                    fontStyle="bold"
                    text="Phone"
                    fontSize={9}
                    y={this.addressRef ? 20 + this.addressRef.getClientRect().height : 40} x={30}
                />
                {/* Phone */}
                <Text
                    ref={node => { this.phoneRef = node }}
                    width={120}
                    fontFamily="Poppins"
                    text={this.props.values.phone}
                    lineHeight="1.3"
                    x={30}
                    fontSize={8}
                    y={this.addressRef ? 35 + this.addressRef.getClientRect().height : 50}
 
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
                    width={300}
                    fontFamily="Poppins"
                    fontStyle="bold"
                    text="Email"
                    fontSize={9}
                    y={this.phoneRef ? 40 + this.addressRef.getClientRect().height+this.phoneRef.getClientRect().height  : 0}
                    x={30}
                />
                {/* Email */}
                <Text
                    ref={node => { this.emailRef = node }}
                    width={120}
                    fontFamily="Poppins"
                    text={this.props.values.email}
                    lineHeight="1.3"
                    x={30}
                    fontSize={8}
                    y={this.phoneRef ? 53 + this.addressRef.getClientRect().height+this.phoneRef.getClientRect().height  : 0}
 
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


            {/* Languages */}
            <Group
                ref={node => { this.languagesRef = node }}
                y={this.infoHeight ? 290+ this.infoHeight.getClientRect().height + 5 : 155}
            >
                <Text
                    width={300}
                    fontFamily="Poppins"
                    fontStyle="bold"
                    text="Languages"
                    fill="#376193"
                    y={0} x={30}
                    fontSize={14}
                />
                <Rect
                    height={2}
                    width={130}
                    fill="#555"
                    y={18} x={30}
                />
                <Group y={20} x={30}>
                    {/* Language 1 */}
                    {this.returnLanguages()}
                </Group>
            </Group>

            {/* Right Side */}
            <Text
                width={320}
                height={20}
                fontFamily="Poppins"
                fontStyle="bold"
                fill="#376193"
                text="Summary"
                y={40} 
                x={200}
                fontSize={14}
            />
            <Rect
                height={2}
                width={245}
                fill="#555"
                y={55} 
                x={200}
            />
            {/* Professional Summary Start   */}
            <Text
                width={245}
                ref={node => { this.summaryRef = node }}
                fontFamily="Poppins"
                text={this.props.values.summary}
                y={60} x={200}
                lineHeight="1.3"
                fontSize={9}
                fill="black"
            />
            {/* Professional Summary  End */}


            {/* Skills */}
            <Group 
            x ={180} y={this.summaryRef ?this.summaryRef.getClientRect().height + 75 : 155} >
                <Text
                    width={300}
                    fontFamily="Poppins"
                    fontStyle="bold"
                    text="Skills"
                    fill="#376193"
                    y={0} x={20}
                    fontSize={14}
                />
                <Rect
                    height={2}
                    width={245}
                    fill="#555"
                    y={15} 
                    x={20}
                />
                <Group ref={node => { this.skRefs = node }}>
                    {this.returnSkills()}
                </Group>
            </Group>

            {/* Experience */}
            <Group 
            ref={node => { this.empRefs = node }}
            x ={180} y={this.skRefs ?this.skRefs.getClientRect().height+
            this.summaryRef.getClientRect().height + 120 : 0} >
                <Text
                    width={200}
                    fontFamily="Poppins"
                    fontStyle="bold"
                    fill="#376193"
                    text="Experience"
                    y={0} x={20}
                    fontSize={14}
                />
                <Rect
                    height={2}
                    width={245}
                    fill="#555"
                    y={15} 
                    x={20}
                />
                {this.returnEmployments()}
            </Group>
            {/* Education History Start   */}


            {/* Education */}
            <Group 
            ref={node => { this.eduRefs = node }}
            x ={180} y={this.empRefs ?this.empRefs.getClientRect().height+this.skRefs.getClientRect().height+
            this.summaryRef.getClientRect().height + 145:100} >
                <Text
                    width={300}
                    fontFamily="Poppins"
                    fontStyle="bold"
                    fill="#376193"
                    text="Education"
                    y={0} x={20}
                    fontSize={14}
                />
                <Rect
                    height={2}
                    width={245}
                    fill="#555"
                    y={15} 
                    x={20}
                />
                <Group x = {-100} width={200} y={-265}>
                   {this.returnEducations()}
                </Group>
            </Group>
            {/* Education History Start   */}
        </Layer>
    </Stage>
    }
}
export default Cv6;