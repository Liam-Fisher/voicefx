import { NumberParameter } from "@rnbo/js";
import * as Nexus from 'nexusui';
import {rgbToHex} from '../helpers/styling';
import { CustomRNBOMetadata } from "../dataTypes";
import { NumberParameterUI } from "./core";
export default class SliderUI extends NumberParameterUI<'slider'> {
    constructor(override meta: CustomRNBOMetadata<'Number', 'slider'>,  param: NumberParameter) {
            super(meta, param);
    }     
  createElement() {
    let mode = this.meta?.relative ? 'absolute' : 'relative';
    let {min, max, value} = this.param;
    let {step, size} = this;
    this.element =  new Nexus.Slider(this.elementId, { size, mode, min, max, step, value} );
    if(this.meta?.knobcolor) {this.element.colorize('accent', rgbToHex(this.meta.knobcolor));}
    if(this.meta?.elementcolor) {this.element.colorize('fill', rgbToHex(this.meta.elementcolor));}
    this.linkElementToParam();
  }
  parseEvent(v: number): number {
    return this.value;
  }
} 