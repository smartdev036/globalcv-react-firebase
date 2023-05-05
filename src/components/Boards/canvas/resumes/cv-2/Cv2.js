import React, { Component } from 'react';
import { Stage, Layer, Rect, Circle, Image, Text, Group, Line } from 'react-konva';
import ImageCall from '../../../../../assets/cv2-assets/phone-call.svg';
import ImagEmail from '../../../../../assets/cv2-assets/envelope.svg';
import ImageAddress from '../../../../../assets/cv2-assets/address.svg';
import jsPDF from 'jspdf';
import useImage from 'use-image';
class Cv2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            callImage: ImageCall
        }
        this.returnEmployments = this.returnEmployments.bind(this);
        this.returnEducations = this.returnEducations.bind(this);
        this.returnSkills = this.returnSkills.bind(this);
    }
    //////////  Handling return of employments
    employmentsHeightToAdd = []; // Height of every employments Item
    employmentsRefs = [] // Reference of every employments Item
    returnEmployments() {
        const employmentsObjects = [] // will hold employments items
        const arrayToReturn = [] // Array thet will be return to render function
        this.employmentsRefs = Object.assign([], this.employmentsRefs);// To fix Object not assignable 
        var TotalHeightToAdd = 0;
        for (let index = 0; index < this.props.values.employments.length; index++) {
            if (index > 0) {
                TotalHeightToAdd = TotalHeightToAdd + this.employmentsHeightToAdd[index - 1]
            }
            employmentsObjects[index] = {
                item:
                    <Group y={index == 0 ? TotalHeightToAdd : TotalHeightToAdd + 10} ref={node => { this.employmentsRefs[index] = node }}>
                        {/* Employer */}
                        <Text x={140} y={10} width={70} fontSize={6} fontFamily="Poppins" text={this.props.values.employments[index].employer} fontStyle="bold"></Text>
                        {/* Duration */}
                        <Text x={140} y={22} width={70} fontSize={5} fontFamily="Poppins" text={this.props.values.employments[index].begin + " - " + this.props.values.employments[index].end} ></Text>
                        {/* Job Title */}
                        <Text x={215} y={10} fontSize={6} width={230} fontFamily="Poppins" text={this.props.values.employments[index].jobTitle} fontStyle="bold"></Text>
                        {/* Job Description */}
                        <Text x={215} y={22} fontSize={5} width={230} fontFamily="Poppins" text={this.props.values.employments[index].description} ></Text>
                    </Group>,
                height: index > 0 ? this.employmentsHeightToAdd[index - 1] : 0
            }
            this.employmentsRefs[index] != undefined ? this.employmentsHeightToAdd[index] = parseInt(this.employmentsRefs[index].getClientRect().height) : this.employmentsHeightToAdd[index] = 0;
            arrayToReturn.push(employmentsObjects[index].item)
        }
        return arrayToReturn;
    }
    //////////  Handling return of Educations
    educationsHeightToAdd = []; // Height of every Educations Item
    educationsRefs = [] // Reference of every Educations Item
    returnEducations() {
        const educationsObjects = [] // will hold Educations items
        const arrayToReturn = [] // Array thet will be return to render function
        this.educationsRefs = Object.assign([], this.educationsRefs);// To fix Object not assignable 
        var TotalHeightToAdd = 0;
        for (let index = 0; index < this.props.values.educations.length; index++) {
            if (index > 0) {
                TotalHeightToAdd = TotalHeightToAdd + this.educationsHeightToAdd[index - 1]
            }
            educationsObjects[index] = {
                item:
                    <Group y={index == 0 ? TotalHeightToAdd : TotalHeightToAdd + 10} ref={node => { this.educationsRefs[index] = node }}>
                        {/* Employer */}
                        <Text x={140} y={10} width={70} fontSize={6} fontFamily="Poppins" text={this.props.values.educations[index].school} fontStyle="bold"></Text>
                        {/* Duration */}
                        <Text x={140} y={22} width={70} fontSize={5} fontFamily="Poppins" text={this.props.values.educations[index].started + " - " + this.props.values.educations[index].finished} ></Text>
                        {/* Job Title */}
                        <Text x={215} y={10} fontSize={6} width={230} fontFamily="Poppins" text={this.props.values.educations[index].degree} fontStyle="bold"></Text>
                        {/* Job Description */}
                        <Text x={215} y={22} fontSize={5} width={230} fontFamily="Poppins" text={this.props.values.educations[index].description} ></Text>
                    </Group>,
                height: index > 0 ? this.educationsHeightToAdd[index - 1] : 0
            }
            this.educationsRefs[index] != undefined ? this.educationsHeightToAdd[index] = parseInt(this.educationsRefs[index].getClientRect().height) : this.educationsHeightToAdd[index] = 0;
            arrayToReturn.push(educationsObjects[index].item)
        }
        return arrayToReturn;
    }
    returnSkills() {
        const skillsObject = []
        const arrayToReturn = [];
        var numberInLine = 1;
        var heightToAdd = 10;
        for (let index = 0; index < this.props.values.skills.length; index++) {
            skillsObject[index] = {
                item:
                    <Group y={heightToAdd} x={40 + ((numberInLine) * 100)}>
                        <Text text={this.props.values.skills[index].name} fontFamily="Poppins" fontSize={6} fontStyle="bold" />
                        {/* Rating */}
                        <Group x={60}>
                            <Circle x={4} y={3} width={5} fill={this.props.values.skills[index].rating > 0 ? "#F0C30E" : "#D3D3D3"}></Circle>
                            <Circle x={10} y={3} width={5} fill={this.props.values.skills[index].rating > 30 ? "#F0C30E" : "#D3D3D3"}></Circle>
                            <Circle x={16} y={3} width={5} fill={this.props.values.skills[index].rating > 50 ? "#F0C30E" : "#D3D3D3"}></Circle>
                            <Circle x={22} y={3} width={5} fill={this.props.values.skills[index].rating > 80 ? "#F0C30E" : "#D3D3D3"}></Circle>
                            <Circle x={28} y={3} width={5} fill={this.props.values.skills[index].rating > 90 ? "#F0C30E" : "#D3D3D3"}></Circle>
                        </Group>
                    </Group>
            }
            numberInLine == 3 ? numberInLine = 1 : numberInLine = numberInLine + 1;
            index == 2 ? heightToAdd = heightToAdd + 20 : index == 5 ? heightToAdd = heightToAdd + 20 : index == 8 ? heightToAdd = heightToAdd + 20 : heightToAdd = heightToAdd;
            arrayToReturn.push(skillsObject[index].item)
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
            var dataUrl = this.stageRef.getStage().toDataURL({ pixelRatio: 4, y: 637 });
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
        return (
            <Stage width={470} height={640} ref={node => { this.stageRef = node }}>
                <Layer ref={node => { this.layer = node }} y={this.props.currentPage > 1 ? -650 : 0} >
                    {/* Circle */}
                    <Circle x={97} y={72} width={120} fill="#F0C30E" />
                    {/* Personal information */}
                    <Text x={80} y={50} fontFamily="Poppins" fontSize={29} fontStyle="bold" text={this.props.values.firstname + " " + this.props.values.lastname} />
                    <Text x={80} y={79} fontFamily="Poppins" fontSize={22} text={this.props.values.occupation} />
                    {/* Contact details top  */}
                    <Group>
                        <ImageCanvas width={22} height={22} x={150} y={135} image={ImageCall} />
                        {/* Phone Call */}
                        <Text text="Phone" fontSize={9} fontFamily="Poppins" fontStyle="bold" x={180} y={137} />
                        <Text width={80} text={this.props.values.phone} fontSize={5} fontFamily="Poppins" x={180} y={150} />
                        {/* Phone Call */}
                        <ImageCanvas width={22} height={22} x={242} y={135} image={ImagEmail} />
                        <Text text="Email" fontSize={9} fontFamily="Poppins" fontStyle="bold" x={270} y={137} />
                        <Text width={50} text={this.props.values.email} fontSize={5} fontFamily="Poppins" x={270} y={150} />
                        {/* Address  */}
                        <ImageCanvas width={22} height={22} x={330} y={135} image={ImageAddress} />
                        <Text text="Address" fontSize={9} fontFamily="Poppins" fontStyle="bold" x={355} y={137} />
                        <Text width={80} text={this.props.values.address + ", " + this.props.values.country} fontSize={5} fontFamily="Poppins" x={355} y={150} />
                    </Group>
                    {/* Bottom Rectangle */}
                    <Rect width={310} height={2} x={140} y={170} fill="black" />
                    {/* Professional Summary Section */}
                    <Group y={175} ref={node => { this.summaryRef = node }}>
                        {/* Section Title */}
                        <Text y={5} x={20} width={120} fontFamily="Poppins" fontStyle="bold" fontSize={14} text="PROFESSIONAL DETAILS"></Text>
                        <Text y={5} x={140} width={300} fontFamily="Poppins" fontSize={5} text={this.props.values.summary}></Text>
                    </Group>
                    {/* Employments  Section */}
                    <Group
                        ref={node => { this.employmentsRef = node }}
                        y={this.summaryRef ? 185 + this.summaryRef.getClientRect().height : 220}>
                        <Rect width={310} height={2} x={140} fill="black" />
                        {/* Section Title */}
                        <Text y={10} x={20} width={120} fontFamily="Poppins" fontStyle="bold" fontSize={14} text="PROFESSIONAL EXPERIENCE"></Text>
                        {/* Job1 */}
                        {this.returnEmployments()}
                    </Group>
                    {/* Educations  Section */}
                    <Group
                        ref={node => { this.educationsRef = node }}
                        y={this.summaryRef && this.employmentsRef ? 200 + (this.summaryRef.getClientRect().height + this.employmentsRef.getClientRect().height) : 220 + 40}>
                        <Rect width={310} height={2} x={140} fill="black" />
                        {/* Section Title */}
                        <Text y={10} x={20} width={120} fontFamily="Poppins" fontStyle="bold" fontSize={14} text="EDUCATION HISTORY"></Text>
                        {/* Educations */}
                        {this.returnEducations()}
                    </Group>
                    {/* Skills  Section */}
                    <Group
                        width={400}
                        y={this.summaryRef && this.employmentsRef ? 205 + (this.summaryRef.getClientRect().height + this.educationsRef.getClientRect().height + this.employmentsRef.getClientRect().height) : 250 + 40}>
                        <Rect width={310} height={2} x={140} fill="black" />
                        {/* Section Title */}
                        <Text y={10} x={20} width={120} fontFamily="Poppins" fontStyle="bold" fontSize={14} text="SKILLS"></Text>
                        {/* Skill 1 */}
                        {this.returnSkills()}
                        {/* Educations */}
                    </Group>
                </Layer>
            </Stage>
        )
    }
}
export default Cv2;
/////////////////// Images
const ImageCanvas = (props) => {
    const [image] = useImage(props.image);
    return <Image x={props.x} y={props.y} height={props.height} width={props.width} image={image} />;
};