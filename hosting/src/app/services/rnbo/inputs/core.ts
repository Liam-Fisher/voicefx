import { BaseDevice, EnumParameter, MessageEvent, NumberParameter, Parameter } from "@rnbo/js";
import { InputType, UIType } from "../types/attributes";
import { CustomRNBOInputMetadata } from "../types/dataTypes";
import { defaultSizes } from "../helpers/styling";


  export abstract class UIInput<T extends InputType, UI extends UIType<T>> {
    size!: [number, number];
    element: any;
    constructor(public meta: CustomRNBOInputMetadata<T, UI>) {
        this.elementSize = defaultSizes[this.meta.maxobj as keyof typeof defaultSizes] as [number, number];
    }
    get elementId(): string {
      return `#${this.name}-ui`;
    }
    abstract get name(): string;
    abstract createElement(): any;
    abstract parseEvent(v: any): number|number[];
    get elementPosition(): [number, number]| undefined  {
        if(!this.meta?.rect) return;
        return [this.meta.rect[0], this.meta.rect[1]];
    }
    get elementSize(): [number, number]| undefined {
        if(!this.meta?.rect) return;
        return [this.meta.rect[2] - this.meta.rect[0], this.meta.rect[3] - this.meta.rect[1]];
    }
    set elementSize(defaultSize: [number, number]) {
        this.size = this.elementSize ?? defaultSize;
        if(this.element) {
            this.element.resize(...this.size);
        }
     }
}

export abstract class InportUI<T extends 'List'|'Message', UI extends UIType<T>> extends UIInput<T,UI> {
    sendOnChange: boolean = true;
    data: number[] = [];
    constructor(override meta: CustomRNBOInputMetadata<T, UI>, public tag: string, public device: BaseDevice) {
        super(meta);
    }
    get name() { return this.tag; }
    get value() { return this.data; } 
    linkElementToInport() {
        this.element.on('change', (v: any) => {
            this.data = this.parseEvent(v) as number[]; 
            if(this.sendOnChange) {
                this.element.emit('send');
            }
        });
        this.element.on('send', () => {
            if((!this.tag)||!this.data.length) {
                return;
            }
            console.log(`${this.tag}: ${this.data.join(' ')}`);
            this.device.scheduleEvent((new MessageEvent(0, this.tag, this.data)))
        });
    }
}
export abstract class ListInportUI<UI extends UIType<'List'>> extends InportUI<'List',UI> {
    constructor(override meta: CustomRNBOInputMetadata<'List', UI>, override tag: string, override device: BaseDevice) {
        super(meta, tag, device);
    }
}


export abstract class ParameterUI<T extends 'Number'|'Enum', UI extends UIType<T>> extends UIInput<T, UI> {
    constructor(override meta: CustomRNBOInputMetadata<T, UI>, public param: Parameter) {
        super(meta);
    }
    get name() { 
        console.log(`getting name ${this.param.name} from`, this.param);
        return this.param.name; 
    }
    get value(): number { return this.param.value }
    get numSteps(): number { return this.param?.steps ?? 0; }
    linkElementToParam() {
        this.element.on('change', (v: any) => {
            const value = this.parseEvent(v) as number;
            console.log(`setting param ${this.param.name} to ${value}`);
            if(this.value !== value) {
                this.param.value = value;
            }
        });
    }
}
export abstract class EnumParameterUI<UI extends UIType<'Enum'>> extends ParameterUI<'Enum',UI> {
    stringEnum: boolean;
    constructor(override meta: CustomRNBOInputMetadata<'Enum', UI>, override param: EnumParameter) {
        super(meta, param);
        this.stringEnum = this.param.enumValues.every(el => typeof el === 'string');
    }
}
export abstract class NumberParameterUI<UI extends UIType<'Number'>> extends ParameterUI<'Number',UI> {
    isNormalized: boolean = false;
    constructor(override meta: CustomRNBOInputMetadata<'Number', UI>, override param: NumberParameter) {
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


  