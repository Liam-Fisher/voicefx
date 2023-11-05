import { NumberParameter } from "@rnbo/js";
import * as Nexus from 'nexusui';
import { CustomRNBOInputMetadata } from "../../types/dataTypes";
import { NumberParameterUI } from "../core";
export default class SliderUI extends NumberParameterUI<'slider'> {
    constructor(override meta: CustomRNBOInputMetadata<'Number', 'slider'>,  param: NumberParameter) {
            super(meta, param);
    }     
  createElement() {
    let mode = this.meta?.relative ? 'absolute' : 'relative';
    let {min, max, value} = this.param;
    let {step, size} = this;
    this.element =  new Nexus.Slider(this.elementId, { size, mode, min, max, step, value} );
    this.linkElementToParam();
  }
  parseEvent(v: number): number {
    return this.value;
  }
} 