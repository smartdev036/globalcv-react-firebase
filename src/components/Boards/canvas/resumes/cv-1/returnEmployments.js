
import React from 'react';
import { Stage, Layer, Rect, Circle, Image, Text, Group, Line } from 'react-konva';
function returnEmployments() {
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
                <Group y={TotalHeightToAdd} ref={node => { this.employmentsRefs[index] = node }}>
                    {/* Employer */}
                    <Text x={140} y={10} width={70} fontSize={8} fontFamily="Poppins" text="Pexens" fontStyle="bold"></Text>
                    {/* Duration */}
                    <Text x={140} y={22} width={70} fontSize={5} fontFamily="Poppins" text="Aug 2020 - Jan 2021" ></Text>
                    {/* Job Title */}
                    <Text x={215} y={10} fontSize={8} width={230} fontFamily="Poppins" text="Web developer in genoa for making websites and more" fontStyle="bold"></Text>
                    {/* Job Description */}
                    <Text x={215} y={22} fontSize={5} width={230} fontFamily="Poppins" text="Aug 2020 - sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss sss 2021" ></Text>
                </Group>,
            height: index > 0 ? this.employmentsHeightToAdd[index - 1] : 0
        }
        this.employmentsRefs[index] != undefined ? this.employmentsHeightToAdd[index] = parseInt(this.employmentsRefs[index].getClientRect().height) : this.employmentsHeightToAdd[index] = 0;
        arrayToReturn.push(employmentsObjects[index].item)
    }
    return arrayToReturn;
}
export default returnEmployments;