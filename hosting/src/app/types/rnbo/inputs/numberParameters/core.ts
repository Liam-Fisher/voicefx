import { NumberParameter, Parameter } from "@rnbo/js";
import { UIType } from "../attributes";
import {  ParameterUI } from "../core";
import { CustomRNBOMetadata } from "../dataTypes";

export abstract class NumberParameterUI<UI extends UIType<'Number'>> extends ParameterUI<'Number',UI> {
    isNormalized: boolean = false;
    constructor(override meta: CustomRNBOMetadata<'Number', UI>, override param: NumberParameter) {
        super(meta, param);
        this.isNormalized = (this.param?.min === 0 && this.param?.max === 1);
    }
    get step(): number {
        if(!this.numSteps) return 0;
        return (this.param.max - this.param.min)/this.numSteps;
    }
    norm(denorm: number): number {
        if(this.isNormalized) return denorm;
        return this.param.convertToNormalizedValue(denorm);    
    }
    denorm(norm: number): number {
        if(this.isNormalized) return norm;
        return this.param.convertFromNormalizedValue(norm);
    } 
    override toString(precision = 2): string {
        if(this.step) {
            precision = String(this.step).length - 2;
        }
      return `${this.denorm(this.param.normalizedValue).toFixed(precision)} ${this.param.unit}`;
    }
}
