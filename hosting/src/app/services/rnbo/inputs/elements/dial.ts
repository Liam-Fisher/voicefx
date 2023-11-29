import { NumberParameter } from "@rnbo/js";
import * as Nexus from 'nexusui';
import { CustomRNBOInputMetadata } from "../../types/dataTypes";
import { NumberParameterUI } from "../core";

export default class DialUI extends NumberParameterUI<'dial'> {
  numberElement: any;
    constructor(override meta: CustomRNBOInputMetadata<'Number', 'dial'>,  param: NumberParameter) {
            super(meta, param);
    }     
  createElement() {
    console.log(`creating dial element ${this.elementId}`);
    let interaction = this.meta?.vtracking ? 'vertical' : 'radial';
    let {min, max, value} = this.param;
    let {step, size} = this;
// the default mode 'relative' is always used
    this.element =  Nexus.Add.Dial(this.elementId, { size, interaction, min, max, step, value} );
    this.numberElement = Nexus.Add.Number(this.elementId, {size: [this.size[0]*0.8, 20], value: this.value});
    this.numberElement.link(this.element);
  }
  parseEvent(v: number): number {
    return v;
  }
} 