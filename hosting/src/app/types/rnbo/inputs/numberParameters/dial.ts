import { NumberParameter } from "@rnbo/js";
import * as Nexus from 'nexusui';
import {rgbToHex} from '../helpers/styling';
import { NumberParameterUI } from "./core";
import { CustomRNBOMetadata } from "../dataTypes";

export default class DialUI extends NumberParameterUI<'dial'> {
    constructor(override meta: CustomRNBOMetadata<'Number', 'dial'>,  param: NumberParameter) {
            super(meta, param);
    }     
  createElement() {
    let interaction = this.meta?.vtracking ? 'vertical' : 'radial';
    let {min, max, value} = this.param;
    let {step, size} = this;
// the default mode 'relative' is always used
    this.element =  new Nexus.Dial(this.elementId, { size, interaction, min, max, step, value} );
    if(this.meta?.needlecolor) this.element.colorize('accent', rgbToHex(this.meta.needlecolor));
    if(this.meta?.outlinecolor) this.element.colorize('fill', rgbToHex(this.meta.outlinecolor));
    this.linkElementToParam();
  }
  parseEvent(v: number): number {
    return v;
  }
} 