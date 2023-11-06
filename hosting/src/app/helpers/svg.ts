import {EventEmitter} from '@angular/core'
import { BaseDevice, Parameter } from '@rnbo/js';

const drawMethods = {drawEqTriangle}

function drawEqTriangle(offset_x: number, offset_y: number, size: number, color: string) {
    const points = [
        [offset_x, offset_y],
        [offset_x, offset_y+size],
        [offset_x+size, offset_y+size/2]
    ].flatMap(([x, y]) => x+','+y).join(' ');
    const fill = color;
    return Object.entries({points, fill})
}

function addSvgAttrs(element: any, attrs: [string, string][]) {
    for(let [attr,value] of drawEqTriangle(0,0,40,'green')) {
        this.renderer.setAttribute(element, attr, value);
    }
}
export function drawPlayButton(nativeSvg: HTMLOrSVGElement, offset_x: number, offset_y: number, size: number) {
    //const nativeSvg = this.svg.nativeElement;
    const element = this.renderer.createElement('polygon', 'http://www.w3.org/2000/svg');
    addSvgAttrs.call(this, element, drawEqTriangle(offset_x,offset_y,size,'green'));
    element.addEventListener('pointerdown', this.printLabel);
    this.renderer.appendChild(nativeSvg, element);
}/* 
function getLine(x, y) {
return `L${(parseInt(x))} ${(parseInt(y))}`;
}
function getPath(arrow) {
const {top, left, shaftWidth, shaftHeight, arrowWidth, arrowHeight } 
= arrow;
   let flareWidth = (arrowWidth-shaftWidth)/2;
   let centerX = left+shaftWidth/2;
   console.log(`centerX: ${centerX}`);
   let bottomY = top+arrowHeight+shaftHeight;
   console.log(`bottomY: ${bottomY}`);
        let pointArray = [
       `M${parseInt(left)} ${parseInt(top)}`,
     getLine(left, top+shaftHeight),
     getLine(left-flareWidth, top+shaftHeight),
     getLine(centerX, bottomY),
     getLine(left+shaftWidth+flareWidth, top+shaftHeight),
     getLine(left+shaftWidth, top+shaftHeight),
     getLine(left+shaftWidth, top),
     getLine(left, top),
     
];
        console.log(pointArray.join(' '));
   const svgPath = document.getElementById('path');
   svgPath.setAttribute('d', pointArray.join(' '));

}
 const points = {
top: 27,
left: 42,
shaftWidth: 16,
shaftHeight: 30,
arrowWidth: 38,
arrowHeight: 18
}; */