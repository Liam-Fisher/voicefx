import { InputAttributes, InputType } from "src/app/types/rnbo/deviceInput";
import * as RNBO from '@rnbo/js';

export abstract class UIInput<T extends InputType> {
    constructor(public meta: InputAttributes<T>) { }
    abstract get name(): string;
}

/* export abstract class ParameterUI<PT extends 'Number'|'Enum'> extends UIInput<PT> {
    constructor(public override meta: InputAttributes<'Number'|'Enum'>, public param: RNBO.Parameter, public desc: RNBO.IParameterDescription) {
        super(meta);
    }
} */

// May not need desc property
export class NumberParameterUI extends UIInput<'Number'> {
    isNormalized: boolean = false;
    constructor(override meta: InputAttributes<'Number'>, public param: RNBO.NumberParameter, public desc: RNBO.IParameterDescription) {
        super(meta);
        this.isNormalized = (this.param?.min === 0 && this.param?.max === 1);
    }
    get normValue(): number {
        return this.param.value;
    }
    get denormValue(): number {
        return this.param.value;
    }
    set value(value: number) {
        this.param.value = value;
    }
    get name(): string {
        return this.param.name;
    }
    get numSteps(): number {
        return this.param?.steps ?? 0;
    }
    get stepSize(): number {
        return (this.param.max - this.param.min)/this.numSteps;
    }
    norm(denorm: number): number {
        return this.param.convertToNormalizedValue(denorm);    
    }
    denorm(norm: number): number {
        return this.param.convertFromNormalizedValue(norm);
    } 
    override toString(precision = 2): string {
      return `${this.denorm(this.param.normalizedValue).toFixed(precision)} ${this.param.unit}`;
    }
}

export class EnumParameterUI extends UIInput<'Enum'> {
    constructor(override meta: InputAttributes<'Enum'>, public param: RNBO.EnumParameter, public desc: RNBO.IParameterDescription) {
        super(meta);
    }
    get name(): string {
    return this.param.name;
    }
}
export class ListInportUI extends UIInput<'List'> {
    constructor(public override meta: InputAttributes<'List'>, public tag: string) {
        super(meta);
    }
    get name(): string {
    return this.tag;
    }
}
export class MessageInportUI extends UIInput<'Message'> {
    constructor(public override meta: InputAttributes<'Message'>, public tag: string) {
        super(meta);
    }
    get name(): string {
        return this.tag;
    }
}
