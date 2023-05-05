import React, { Component } from 'react'
import { Stage, Layer, Rect, Circle, Image, Text, Group, Line } from 'react-konva';
import jsPDF from 'jspdf';
class Cv1 extends Component {
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
                    item: <Group verticalAlign="top" y={TotalHeightToAdd} ref={node => { this.refs[index] = node }} >
                        <Rect height={4} width={300} y={260}>
                        </Rect>
                        <Text // Employment name and employer
                            width={300}
                            fontFamily="Poppins"
                            text={this.props.values.employments[index].jobTitle + ", " + this.props.values.employments[index].employer}
                            verticalAlign="top"
                            y={264} x={125}
                            fontSize={7}
                            fontStyle="bold"
                        />
                        <Text // employment date
                            width={300}
                            verticalAlign="top"
                            fontFamily="Poppins"
                            text={this.props.values.employments[index].begin + " - " + this.props.values.employments[index].end}
                            y={264} x={370}
                            fontSize={7}
                            fontStyle="bold"
                        />
                        <Text // Employment Description
                            width={320}
                            verticalAlign="top"
                            fontFamily="Poppins"
                            text={this.props.values.employments[index].description}
                            y={275} x={125}
                            fontSize={7}
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
                        <Rect height={4} width={300} y={260}>
                        </Rect>
                        <Text // Employment name and employer
                            width={300}
                            fontFamily="Poppins"
                            text={this.props.values.educations[index].degree + ", " + this.props.values.educations[index].school}
                            verticalAlign="top"
                            y={267} x={125}
                            fontSize={7}
                            fontStyle="bold"
                        />
                        <Text // employment date
                            width={300}
                            verticalAlign="top"
                            fontFamily="Poppins"
                            text={this.props.values.educations[index].started + " - " + this.props.values.educations[index].finished}
                            y={267} x={370}
                            fontSize={7}
                            fontStyle="bold"
                        />
                        <Text // Employment Description
                            width={320}
                            verticalAlign="top"
                            fontFamily="Poppins"
                            text={this.props.values.educations[index].description}
                            y={277} x={125}
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
        var skillsObjects = [];
        var arrayToReturn = [];
        var TotalHeightToAdd = 0;
        this.skillsRefs = Object.assign([], this.skillsRefs);
        for (let index = 0; index < this.props.values.skills.length; index++) {
            if (index > 0) {
                TotalHeightToAdd = TotalHeightToAdd + this.skillsHeightToAdd[index - 1]
            }
            skillsObjects[index] = {
                item:
                    <Group y={TotalHeightToAdd} ref={node => { this.skillsRefs[index] = node }} >
                        <Text
                            width={300}
                            fontFamily="Poppins"
                            text={this.props.values.skills[index] !== null ? this.props.values.skills[index].name : ""}
                            y={200} x={30}
                            fontSize={7}
                        />
                        {/* ProgressBar */}
                        <Rect
                            height={4}
                            width={100}
                            strokeWidth={2}
                            stroke="black"
                            y={211} x={30} scaleX={0.8}
                        />
                        <Rect
                            height={4}
                            width={this.props.values.skills[index] != undefined ? this.props.values.skills[index].rating : 0}
                            fill="black"
                            y={211} x={30} scaleX={0.8}
                        />
                        {/* Spacing at the end */}
                        <Rect
                            height={6}
                            width={60}
                            y={220} x={30}
                        />
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
                        fontSize={7}
                        fontStyle="bold"
                        fontFamily="Poppins"
                    />
                    <Text
                        x={48}
                        text={this.props.values.languages[index].level}
                        fontSize={7}
                        fontFamily="Poppins"
                    />
                </Group>
                ,
                height: index > 0 ? this.languagesHeightToAdd[index - 1] : 0,
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

    render() {
        return <Stage width={470} height={640} ref={node => { this.stageRef = node }}>
            <Layer y={this.props.currentPage > 1 ? -650 : 0} x={0} ref={node => { this.layer = node }}>
                {this.props.values.photo != null ?
                        <Image
                            x={30}
                            y={30}
                            height={85}
                            width={85}
                            image={this.props.values.photo}
                        ></Image> 
                    
                    : <Group x={-20}>
                        <Rect
                            stroke="#080808"
                            height={70}
                            width={70}
                            x={50}
                            y={40}
                            strokeWidth={2}
                        />
                        <Text
                            width={300}
                            height={200}
                            fontFamily="Poppins" fontStyle="bold" text={"photo"} fontSize={9} y={70} x={72} />
                    </Group>
                }
                {/* First Name And Last Name */}
                <Text
                    width={300}
                    fontFamily="Poppins"
                    fontStyle="bold"
                    text={this.props.values.firstname + " " + this.props.values.lastname}
                    y={50} x={130}
                    fontSize={20}
                    ref={node => { this.firstnameRef = node }}
                />
                <Text
                    width={260}
                    height={200}
                    fontFamily="Poppins"
                    text={this.props.values.occupation}
                    y={this.firstnameRef ? 60 + this.firstnameRef.getClientRect().height : 80} x={130}
                    fontSize={15}
                />
                {/* Content*/}
                {/* Professional Summary Title  */}
                <Text
                    width={300}
                    height={200}
                    fontFamily="Poppins"
                    fontStyle="bold"
                    text="Professional Summary"
                    y={160} x={125}
                    fontSize={15}
                />
                <Rect
                    height={4}
                    width={320}
                    fill="black"
                    y={185} x={125}
                />
                {/* Professional Summary Start   */}
                <Text
                    width={333}
                    ref={node => { this.summaryRef = node }}
                    fontFamily="Poppins"
                    text={this.props.values.summary}
                    y={200} x={125}
                    lineHeight="1.2"
                    fontSize={7}
                />
                {/* Professional Summary Title  End */}
                <Group
                    ref={node => { this.infoHeight = node }}
                >
                    {/* Professional Summary  End */}
                    {/* Info Title  */}
                    <Text
                        width={300}
                        fontFamily="Poppins"
                        fontStyle="bold"
                        text="Info"
                        y={160} x={30}
                        fontSize={15}
                    />
                    <Rect
                        height={4}
                        width={30}
                        fill="black"
                        y={185} x={30}
                    />
                    {/* Info Content Start  */}
                    {/* Address */}
                    <Text
                        width={300}
                        fontFamily="Poppins"
                        fontStyle="bold"
                        text="Address"
                        y={200} x={30}
                        fontSize={9}
                    />
                    <Text
                        width={82}
                        ref={node => { this.addressRef = node }}
                        fontFamily="Poppins"
                        text={this.props.values.address}
                        lineHeight="1.2"
                        y={217} x={30}
                        fontSize={7}
                    />
                    {/* Address */}
                    <Text
                        width={300}
                        fontFamily="Poppins"
                        fontStyle="bold"
                        text="Phone"
                        fontSize={9}
                        y={this.addressRef ? 224 + this.addressRef.getClientRect().height : 234} x={30}
                    />
                    {/* Address */}
                    <Text
                        ref={node => { this.phoneRef = node }}
                        width={82}
                        fontFamily="Poppins"
                        text={this.props.values.phone}
                        lineHeight="1.2"
                        x={30}
                        y={this.addressRef ? 240 + this.addressRef.getClientRect().height : 249}
                        fontSize={7}
     
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
                    <Text
                        width={300}
                        fontFamily="Poppins"
                        fontStyle="bold"
                        text="Email"
                        fontSize={9}
                        y={this.addressRef ? 255 + this.addressRef.getClientRect().height : 275}
                        x={30}
                    />
                    <Text
                        width={90}
                        fontFamily="Poppins"
                        text={this.props.values.email}
                        lineHeight="1.2"
                        x={30}
                        y={this.addressRef ? 270 + this.addressRef.getClientRect().height : 290}
                        fontSize={7}
                    />
                </Group>
                {/* Languages */}
                <Group
                    ref={node => { this.languagesRef = node }}
                    y={this.infoHeight ? this.infoHeight.getClientRect().height + 5 : 155}
                >
                    <Text
                        width={300}
                        fontFamily="Poppins"
                        fontStyle="bold"
                        text="Languages"
                        y={160} x={30}
                        fontSize={14}
                    />
                    <Rect
                        height={4}
                        width={30}
                        fill="black"
                        y={178} x={30}
                    />
                    <Group y={178} x={30}>
                        {/* Language 1 */}
                        {this.returnLanguages()}
                    </Group>
                </Group>
                {/* Skills */}
                <Group
                    y={this.infoHeight ? this.infoHeight.getClientRect().height + this.languagesRef.getClientRect().height + 10 : 155}
                >
                    <Text
                        width={300}
                        fontFamily="Poppins"
                        fontStyle="bold"
                        text="Skills"
                        y={160} x={30}
                        fontSize={14}
                    />
                    <Rect
                        height={4}
                        width={30}
                        fill="black"
                        y={180} x={30}
                    />
                    {this.returnSkills()}
                </Group>
                <Group
                    width={300}
                    ref={node => { this.employmentsRef = node }}
                    y={this.summaryRef ? this.summaryRef.getClientRect().height - 10 : 0}
                >
                    {/* Employment History Title  */}
                    <Text
                        fontFamily="Poppins"
                        fontStyle="bold"
                        text="Employment History"
                        y={229} x={125}
                        fontSize={14}
                    />
                    <Rect
                        height={4}
                        width={320}
                        fill="black"
                        y={249} x={125}
                    />
                    {/* Professional Summary Title  End */}
                    {/* Employments  Start */}
                    {this.returnEmployments()}
                    {/* Employments  End */}
                </Group>
                {/* Education History Start   */}
                <Group
                    ref={node => { this.educationsRef = node }}
                    y={this.summaryRef ? ((this.summaryRef.getClientRect().height + this.employmentsRef.getClientRect().height) - 40) : 0}
                >
                    {/* Education History Title  */}
                    <Text
                        width={300}
                        height={200}
                        fontFamily="Poppins"
                        fontStyle="bold"
                        text="Education History"
                        y={264} x={125}
                        fontSize={14}
                    />
                    <Rect
                        height={4}
                        width={320}
                        fill="black"
                        y={284} x={125}
                    />
                    {/* Education History Title  End */}
                    {/* Educations  Start */}
                    {/* Here Education list goes */}
                    {this.returnEducations()}
                    {/* Educations  End */}
                </Group>
            </Layer>
        </Stage>
    }
}
export default Cv1;