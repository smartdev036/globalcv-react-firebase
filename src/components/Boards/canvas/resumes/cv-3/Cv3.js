import React, { Component } from 'react'
import { Stage, Layer, Rect, Circle, Image, Text, Group, Line } from 'react-konva';
import jsPDF from 'jspdf';
class Cv3 extends Component {
    constructor(props) {
        super(props);
        this.returnEmployments = this.returnEmployments.bind(this);
        this.returnEducations = this.returnEducations.bind(this);
        this.returnSkills = this.returnSkills.bind(this);
        this.returnLaguages = this.returnLaguages.bind(this);
        this.checkForDownload = this.checkForDownload.bind(this);
    }
    // Employments list data holders
    heighToAdd = []; // Holding the height of every employment item 
    refs = [] // Holding the reference of each employment item so we can access to its heigh seperatly
    // Educations list data holders
    educationsHeighToAdd = [];
    educationsRefs = [] // Holding the reference of each employment item so we can access to its heigh seperatly
    /// Function responsable for returning employments and adjusting their heights
    returnEmployments() {
        const employmentsObjects = [];
        const arrayToReturn = [];
        var TotalHeightToAdd = 0;
        this.refs = Object.assign([], this.refs);
        for (let index = 0; index < this.props.values.employments.length; index++) {
            if (this.props.values.employments[index] !== null) {
                if (index > 0) {
                    TotalHeightToAdd = TotalHeightToAdd + this.heighToAdd[index - 1] + 10
                }
                employmentsObjects[index] =
                {
                    item: <Group y={TotalHeightToAdd} ref={node => { this.refs[index] = node }}>
                        <Text fontFamily="Georgia" fontSize={8} fontStyle="bold" text={this.props.values.employments[index].jobTitle} />
                        <Text x={230} fontFamily="Georgia" fontSize={8} text={this.props.values.employments[index].begin + " - " + this.props.values.employments[index].end} />
                        <Text y={10} fontFamily="Georgia" fontSize={8} text={this.props.values.employments[index].employer} />
                        <Text y={20} width={320} fontFamily="Georgia" fontSize={8} text={this.props.values.employments[index].description} />
                    </Group>,
                    height: index > 0 ? this.heighToAdd[index - 1] : 0
                }
                this.refs[index] != undefined ? this.heighToAdd[index] = parseInt(this.refs[index].getClientRect().height) : this.heighToAdd[index] = 0;
                arrayToReturn.push(employmentsObjects[index].item);
            }
        }
        return arrayToReturn;
    }
    returnEducations() {
        const educationsObjects = [];
        var arraytToReturn = [];
        var TotalHeightToAdd = 0; // give it a 30 because the heading of educations is 30 so we  need to move the educations down by 30px 
        this.educationsRefs = Object.assign([], this.educationsRefs);// To fix Object not assignable 
        for (let index = 0; index < this.props.values.educations.length; index++) {
            if (this.props.values.educations[index] !== null) {
                if (index > 0) {
                    TotalHeightToAdd = TotalHeightToAdd + this.educationsHeighToAdd[index - 1] + 10
                }
                educationsObjects[index] = {
                    item: <Group y={parseInt(TotalHeightToAdd)} ref={node => { this.educationsRefs[index] = node }}>
                        <Text fontFamily="Georgia" fontSize={8} fontStyle="bold" text={this.props.values.educations[index].degree + ", " + this.props.values.educations[index].school} />
                        <Text y={0} x={230} width={340} fontFamily="Georgia" fontSize={8} text={this.props.values.educations[index].started + " - " + this.props.values.educations[index].finished} />
                        <Text y={10} width={320} fontFamily="Georgia" fontSize={8} text={this.props.values.educations[index].description} />
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
        var heightToAdd = 10;
        for (let index = 0; index < this.props.values.skills.length; index++) {
            skillsObject[index] = {
                item: <Group y={heightToAdd} x={numberInLine == 1 ? 0 : 160}>
                    <Circle y={5} width={4} fill="#3B3B3B" />
                    <Text fontFamily="Georgia" fill="#3B3B3B" fontSize={8} x={5} y={2} text={this.props.values.skills[index].name} />
                </Group>
            }
            numberInLine == 2 ? numberInLine = 1 : numberInLine = numberInLine + 1;
            index == 1 ? heightToAdd = heightToAdd + 20 : index == 3 ? heightToAdd = heightToAdd + 20 : index == 5 ? heightToAdd = heightToAdd + 20 : heightToAdd = heightToAdd;
            arrayToReturn.push(skillsObject[index].item)
        }
        return arrayToReturn;
    }
    returnLaguages() {
        const languagesObject = [];
        const arrayToReturn = [];
        var numberInLine = 1;
        var heightToAdd = 10;
        for (let index = 0; index < this.props.values.languages.length; index++) {
            languagesObject[index] = {
                item: <Group y={heightToAdd} x={numberInLine == 1 ? 0 : 160}>
                    <Circle y={5} width={4} fill="#3B3B3B" />
                    <Text fontFamily="Georgia" fill="#3B3B3B" fontSize={8} x={5} y={2} text={this.props.values.languages[index].name + " : " + this.props.values.languages[index].level} />
                </Group>
            }
            numberInLine == 2 ? numberInLine = 1 : numberInLine = numberInLine + 1;
            index == 1 ? heightToAdd = heightToAdd + 20 : index == 3 ? heightToAdd = heightToAdd + 20 : index == 5 ? heightToAdd = heightToAdd + 20 : heightToAdd = heightToAdd;
            arrayToReturn.push(languagesObject[index].item)
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
                    {/* Personal Information */}
                    <Group x={40} y={40} ref={node => { this.personalInfoRef = node }}>
                        <Text fontFamily="Georgia" fill="#A96366" fontStyle="bold" fontSize={23} text={this.props.values.firstname} />
                        <Text fontFamily="Georgia" fill="#A96366" fontStyle="bold" y={30} fontSize={23} text={this.props.values.lastname} />
                        <Text fontFamily="Georgia" fill="#3B3B3B" fontStyle="bold" y={60} fontSize={10} text={this.props.values.occupation} />
                        <Text fontFamily="Georgia" fill="#3B3B3B" y={75} fontSize={10} text={this.props.values.city + "," + this.props.values.postalcode} />
                        <Text fontFamily="Georgia" fill="#3B3B3B" y={90} fontSize={10} text={this.props.values.email} />
                        <Text fontFamily="Georgia" fill="#3B3B3B" y={105} fontSize={10} text={this.props.values.phone} />
                    </Group>
                    {/* Seperator Line */}
                    <Rect x={40} height={1} y={this.stageRef ? this.personalInfoRef.getClientRect().height + 55 /* This 60 is the padding added at the top + some spacing under personal info  40padding + 15 spacing */ : 0} width={400} fill="#ededed" />
                    {/* Summary Section*/}
                    <Group x={40} y={this.stageRef ? this.personalInfoRef.getClientRect().height + 77 /* This 60 is the padding added at the top + some spacing under personal info  40padding + 15 spacing */ : 0} ref={node => { this.SummaryRef = node }} >
                        {/* Section Title */}
                        <Text fontFamily="Georgia" fontSize={11} text="Summary" />
                        {/* Secion Content */}
                        <Group x={80}>
                            <Text width={320} fontFamily="Georgia" fontSize={8} text={this.props.values.summary} />
                        </Group>
                    </Group>
                    {/* Seperator Line */}
                    <Rect x={40} height={1} y={this.stageRef && this.personalInfoRef ? this.personalInfoRef.getClientRect().height + this.SummaryRef.getClientRect().height + 100 /* This 60 is the padding added at the top + some spacing under personal info  40padding + 15 spacing */ : 0} width={400} fill="#ededed" />
                    {/* Working Experience*/}
                    <Group x={40} y={this.stageRef ? this.personalInfoRef.getClientRect().height + this.SummaryRef.getClientRect().height + 120 /* This 60 is the padding added at the top + some spacing under personal info  40padding + 15 spacing */ : 0} ref={node => { this.ExperienceRef = node }} >
                        {/* Section Title */}
                        <Text fontFamily="Georgia" fontSize={11} text="Experience" />
                        {/* Secion Content */}
                        <Group x={80}>
                            {/* Job 1 */}
                            {this.returnEmployments()}
                        </Group>
                    </Group>
                    {/* Seperator Line */}
                    <Rect x={40} height={1} y={this.stageRef ? this.ExperienceRef.getClientRect().height + this.personalInfoRef.getClientRect().height + this.SummaryRef.getClientRect().height + 130 /* This 60 is the padding added at the top + some spacing under personal info  40padding + 15 spacing */ : 0} width={400} fill="#ededed" />
                    {/* Education History*/}
                    <Group x={40} y={this.stageRef ? this.personalInfoRef.getClientRect().height + this.ExperienceRef.getClientRect().height + this.SummaryRef.getClientRect().height + 150/* This 60 is the padding added at the top + some spacing under personal info  40padding + 15 spacing */ : 0} ref={node => { this.EducationsRef = node }} >
                        {/* Section Title */}
                        <Text fontFamily="Georgia" fontSize={11} text="Education" />
                        {/* Secion Content */}
                        <Group x={80}>
                            {this.returnEducations()}
                        </Group>
                    </Group>
                    {/* Seperator Line */}
                    <Rect x={40} height={1} y={this.stageRef ? this.ExperienceRef.getClientRect().height + this.personalInfoRef.getClientRect().height + this.SummaryRef.getClientRect().height + this.EducationsRef.getClientRect().height + 170 /* This 60 is the padding added at the top + some spacing under personal info  40padding + 15 spacing */ : 0} width={400} fill="#ededed" />
                    {/* Skills History*/}
                    <Group x={40} y={this.stageRef ? this.EducationsRef.getClientRect().height + this.personalInfoRef.getClientRect().height + this.ExperienceRef.getClientRect().height + this.SummaryRef.getClientRect().height + 188/* This 60 is the padding added at the top + some spacing under personal info  40padding + 15 spacing */ : 0} ref={node => { this.SkillsRef = node }} >
                        {/* Section Title */}
                        <Text fontFamily="Georgia" fontSize={11} text="Skills" />
                        {/* Secion Content */}
                        <Group x={80} y={-10}>
                            {/* Skill 1 */}
                            {this.returnSkills()}
                        </Group>
                    </Group>
                    {/* Seperator Line */}
                    <Rect x={40} height={1} y={this.stageRef ? this.ExperienceRef.getClientRect().height + this.SkillsRef.getClientRect().height + this.personalInfoRef.getClientRect().height + this.SummaryRef.getClientRect().height + this.EducationsRef.getClientRect().height + 199 /* This 60 is the padding added at the top + some spacing under personal info  40padding + 15 spacing */ : 0} width={400} fill="#ededed" />
                    {/* Languages */}
                    <Group x={40} y={this.stageRef ? this.EducationsRef.getClientRect().height + this.SkillsRef.getClientRect().height + this.personalInfoRef.getClientRect().height + this.ExperienceRef.getClientRect().height + this.SummaryRef.getClientRect().height + 217/* This 60 is the padding added at the top + some spacing under personal info  40padding + 15 spacing */ : 0} ref={node => { this.languagesRef = node }} >
                        {/* Section Title */}
                        <Text fontFamily="Georgia" fontSize={11} text="Languages" />
                        {/* Secion Content */}
                        <Group x={80} y={-10}>
                            {/* Skill 1 */}
                            {this.returnLaguages()}
                        </Group>
                    </Group>
                </Layer>
            </Stage>
        );
    }
}
export default Cv3