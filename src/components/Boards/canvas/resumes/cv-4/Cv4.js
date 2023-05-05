import React, { Component } from 'react'
import { Stage, Layer, Rect, Circle, Image, Text, Group, Line } from 'react-konva';
import jsPDF from 'jspdf';
class Cv4 extends Component {
    constructor(props) {
        super(props);
        this.returnEmployments = this.returnEmployments.bind(this);
        this.returnEducations = this.returnEducations.bind(this);
        this.returnSkills = this.returnSkills.bind(this);
        this.returnLanguages = this.returnLanguages.bind(this);
        this.checkForDownload = this.checkForDownload.bind(this);
    }
    // Employments list data holders
    heighToAdd = []; // Holding the height of every employment item 
    refs = [] // Holding the reference of each employment item so we can access to its heigh seperatly
    // Educations list data holders
    returnEmployments() {
        const employmentsObjects = [];
        const arraytToReturn = []
        var TotalHeightToAdd = 0;
        this.refs = Object.assign([], this.refs)
        for (let index = 0; index < this.props.values.employments.length; index++) {
            if (index > 0) {
                TotalHeightToAdd = TotalHeightToAdd + this.heighToAdd[index - 1] + 5
            }
            if (this.props.values.employments[index] !== null) {
                employmentsObjects[index] =
                {
                    item: <Group y={TotalHeightToAdd} ref={node => { this.refs[index] = node }}>
                        {/* Job title */}
                        <Text fontFamily="Poppins" fontSize="6" fontStyle="bold" y={20} width={230} text={this.props.values.employments[index].jobTitle} />
                        {/* Date */}
                        <Text x={230} fontFamily="Poppins" fontSize="6" fontStyle="bold" y={20} width={230} text={this.props.values.employments[index].begin + " - " + this.props.values.employments[index].end} />
                        {/* Employer */}
                        <Text fontFamily="Poppins" fontSize="6" y={30} width={285} fontStyle="bold" fill="#a9aaab" text={this.props.values.employments[index].employer} />
                        {/* Job Description */}
                        <Text fontFamily="Poppins" fontSize="6" y={38} width={285} text={this.props.values.employments[index].description} />
                    </Group>,
                    height: index > 0 ? this.heighToAdd[index - 1] : 0
                }
                this.refs[index] != undefined ? this.heighToAdd[index] = parseInt(this.refs[index].getClientRect().height) : this.heighToAdd[index] = 0;
                arraytToReturn.push(employmentsObjects[index].item);
            }
        }
        return arraytToReturn;
    }
    // Educations list data holders
    educationsHeighToAdd = [];
    educationsRefs = [] // Holding the reference of each employment item so we can access to its heigh seperatly
    returnEducations() {
        const educationsObjects = [];
        var arraytToReturn = [];
        var TotalHeightToAdd = 0;
        this.educationsRefs = Object.assign([], this.educationsRefs);// To fix Object not assignable 
        for (let index = 0; index < this.props.values.educations.length; index++) {
            if (index > 0) {
                TotalHeightToAdd = TotalHeightToAdd + this.educationsHeighToAdd[index - 1] + 5
            }
            if (this.props.values.educations[index] !== null) {
                educationsObjects[index] = {
                    item: <Group y={parseInt(TotalHeightToAdd)} ref={node => { this.educationsRefs[index] = node }}>
                        {/* Job title */}
                        <Text fontFamily="Poppins" fontSize="6" fontStyle="bold" y={20} width={230} text={this.props.values.educations[index].degree} />
                        {/* Date */}
                        <Text x={230} fontFamily="Poppins" fontSize="6" fontStyle="bold" y={20} width={230} text={this.props.values.educations[index].started + " - " + this.props.values.educations[index].finished} />
                        {/* School */}
                        <Text fontFamily="Poppins" fontSize="6" y={30} width={285} fontStyle="bold" fill="#a9aaab" text={this.props.values.educations[index].school} />
                        {/* Education Description */}
                        <Text fontFamily="Poppins" fontSize="6" y={38} width={285} text={this.props.values.educations[index].description} />
                    </Group>,
                    height: index > 0 ? this.educationsHeighToAdd[index - 1] : 0
                }
                this.educationsRefs[index] != undefined ? this.educationsHeighToAdd[index] = parseInt(this.educationsRefs[index].getClientRect().height) : this.educationsHeighToAdd[index] = 0;
                arraytToReturn.push(educationsObjects[index].item)
            }
        }
        return arraytToReturn;
    }
    // Skills list data holders
    skillsHeightToAdd = [];
    skillsRefs = [];
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
                        <Text fontFamily="Poppins" fontSize={7} y={20} width={283} text={this.props.values.skills[index] !== null ? this.props.values.skills[index].name : ""} />
                        <Rect y={30} strokeWidth={1} stroke="#3D3E42" height={3} width={100} />
                        <Rect y={30} strokeWidth={1} stroke="#3D3E42" fill="#3D3E42" height={3} width={this.props.values.skills[index] != undefined ? this.props.values.skills[index].rating : 0} />
                    </Group>
                ,
                height: index > 0 ? this.educationsHeighToAdd[index - 1] : 0,
            }
            this.skillsRefs[index] != undefined ? this.skillsHeightToAdd[index] = parseInt(this.skillsRefs[index].getClientRect().height) : this.skillsHeightToAdd[index] = 0
            arrayToReturn.push(skillsObjects[index].item);
        }
        return arrayToReturn;
    }
    // Languages list data holders
    languagesHeightToAdd = [];
    languagesRefs = [];
    returnLanguages() {
        var languagesObjects = [];
        var arrayToReturn = [];
        var TotalHeightToAdd = 10;
        this.languagesRefs = Object.assign([], this.languagesRefs);
        for (let index = 0; index < this.props.values.languages.length; index++) {
            if (index > 0) {
                TotalHeightToAdd = TotalHeightToAdd + this.languagesHeightToAdd[index - 1] + 3
            }
            languagesObjects[index] = {
                item: <Group y={TotalHeightToAdd} ref={node => { this.languagesRefs[index] = node }} >
                    <Text y={14} fontFamily="Poppins" fontSize="6" fontStyle="bold" text={this.props.values.languages[index].name} />
                    <Text y={14} x={87} fontFamily="Poppins" fontSize="6" text={this.props.values.languages[index].level} />
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
        this.props.triggerDownload == true && this.checkForDownload()
    }
    render() {
        return (
            <Stage y={this.props.currentPage > 1 ? -650 : 0} fontFamily="Georgia" width={470} height={640} ref={node => { this.stageRef = node }}>
                <Layer ref={node => { this.layer = node }} >
                    {/* Head */}
                    <Group ref={node => { this.headRef = node }} >
                        <Rect width={470} height={100} fill="#3D3E42"></Rect>
                        <Text y={35} width={470} letterSpacing={2} align="center" fontFamily="Poppins" fontSize={15} text={this.props.values.firstname + " " + this.props.values.lastname} fill="white" />
                        {/* Wrapping Rectangle */}
                        <Rect x={(this.props.values.firstname.length + this.props.values.lastname.length) > 23 ? 78 : 110} y={20} width={(this.props.values.firstname.length + this.props.values.lastname.length) > 23 ? 310 : 240} align="center" strokeWidth={1} height={65} stroke="white" fill={false}></Rect>
                        {/* Name Underline */}
                        <Rect y={55} x={205} height={1} fill="white" width={50} />
                        {/* Occupation */}
                        <Text y={60} width={470} letterSpacing={2} align="center" fontFamily="Poppins" fontSize={10} text={this.props.values.occupation} fill="#FBFAFF" />
                    </Group>
                    {/* Seperator */}
                    <Rect
                        height={this.stageRef ? this.employmentsRef.getClientRect().height + this.educationsRef.getClientRect().height + this.profileRef.getClientRect().height + 10 : 0}
                        width={2}
                        y={this.stageRef ? this.headRef.getClientRect().height + 20 : 0}
                        x={150}
                        fill="#3D3E42"
                    />
                    {/* Profile  */}
                    <Group x={170} y={this.headRef ? this.headRef.getClientRect().height + 20 : 0} ref={node => { this.profileRef = node }} >
                        <Text fontFamily="Poppins" fontStyle="bold" text="PROFILE" />
                        {/* Summary */}
                        <Text fontFamily="Poppins" fontSize={6} y={20} width={283} text={this.props.values.summary} />
                    </Group>
                    {/* Employments */}
                    <Group x={170} y={this.stageRef ? this.headRef.getClientRect().height + this.profileRef.getClientRect().height + 30 : 0} ref={node => { this.employmentsRef = node }} >
                        <Text fontFamily="Poppins" fontStyle="bold" text="EMPLOYMENTS" />
                        {/* Jobs*/}
                        {this.returnEmployments()}
                    </Group>
                    {/* Educations */}
                    <Group x={170} y={this.stageRef ? this.headRef.getClientRect().height + this.employmentsRef.getClientRect().height + 10 + this.profileRef.getClientRect().height + 30 : 0} ref={node => { this.educationsRef = node }}>
                        <Text fontFamily="Poppins" fontStyle="bold" text="EDUCATIONS" />
                        {/* Education List */}
                        {this.returnEducations()}
                    </Group>
                    {/*  Left Side */}
                    {/* Skills */}
                    <Group x={20} y={this.headRef ? this.headRef.getClientRect().height + 20 : 0} ref={node => { this.detailsRef = node }}  >
                        <Text fontFamily="Poppins" fontStyle="bold" text="DETAILS" />
                        <Text y={14} fontSize={6} fontFamily="Poppins" text={this.props.values.email} />
                        <Text y={23} fontSize={6} fontFamily="Poppins" text={this.props.values.phone} />
                        <Text y={31} width={120} fontSize={6} fontFamily="Poppins" text={this.props.values.address + " ," + this.props.values.city} />
                        <Text y={41} fontFamily="Poppins" fontSize={6} text={this.props.values.postalcode} />
                        {/* Skill */}
                    </Group>
                    {/* Skills */}
                    <Group x={20} y={this.headRef ? this.headRef.getClientRect().height + this.detailsRef.getClientRect().height + 30 : 0} ref={node => { this.skillsRef = node }} >
                        <Text fontFamily="Poppins" fontStyle="bold" text="SKILLS" />
                        {/* Skill */}
                        {this.returnSkills()}
                    </Group>
                    {/* Languages */}
                    <Group x={20} y={this.skillsRef ? this.headRef.getClientRect().height + this.skillsRef.getClientRect().height + this.detailsRef.getClientRect().height + 40 : 0} ref={node => { this.languagesRef = node }}  >
                        <Text fontFamily="Poppins" fontStyle="bold" text="LANGUAGES" />
                        {/* Language */}
                        {this.returnLanguages()}
                    </Group>
                </Layer>
            </Stage>
        );
    }
}
export default Cv4;