import { NumberParameter } from "@rnbo/js";
import * as Nexus from 'nexusui';
import { rgbToHex } from "../helpers/styling";
import { CustomRNBOMetadata } from "../dataTypes";
import { NumberParameterUI } from "./core";
export default class NumberUI extends NumberParameterUI<'number'> {

    constructor(override meta: CustomRNBOMetadata<'Number', 'number'>,  param: NumberParameter) {
            super(meta, param);
    }     
  createElement() {
    let {min, max, value} = this.param;
    let {step, size} = this;
// the default mode 'relative' is always used
    console.log({ size, min, max, step, value})
    this.element =  new Nexus.Number(this.elementId, { size, min, max, step, value} );
    if(this.meta?.textcolor) {
      this.element.colorize('dark', rgbToHex(this.meta.textcolor));
    }
    if(this.meta?.bgcolor) {
      this.element.colorize('accent', rgbToHex(this.meta.bgcolor));
    }
    this.linkElementToParam();
  }
  parseEvent(v: number): number {
    return this.value;
  }
  
} 