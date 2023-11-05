import { NumberParameter } from "@rnbo/js";
import * as Nexus from 'nexusui';
import { CustomRNBOInputMetadata } from "../../types/dataTypes";
import { NumberParameterUI } from "../core";

export default class DialUI extends NumberParameterUI<'dial'> {
    constructor(override meta: CustomRNBOInputMetadata<'Number', 'dial'>,  param: NumberParameter) {
            super(meta, param);
    }     
  createElement() {
    console.log(`creating dial element ${this.elementId}`);
    let interaction = this.meta?.vtracking ? 'vertical' : 'radial';
    let {min, max, value} = this.param;
    let {step, size} = this;
// the default mode 'relative' is always used
    this.element =  new Nexus.Dial(this.elementId, { size, interaction, min, max, step, value} );
    this.linkElementToParam();
  }
  parseEvent(v: number): number {
    return v;
  }
} 