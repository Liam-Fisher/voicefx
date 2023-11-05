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
}