import { BaseDevice, EnumParameter, MessageEvent, NumberParameter, Parameter } from "@rnbo/js";
import { InputType, UIType } from "./attributes";
import { defaultSizes } from "./helpers/styling";
import { CustomRNBOMetadata } from "./dataTypes";


  export abstract class UIInput<T extends InputType, UI extends UIType<T>> {
    size!: [number, number];
    element: any;
    constructor(public meta: CustomRNBOMetadata<T, UI>) {
        this.elementSize = defaultSizes[this.meta.maxobj as keyof typeof defaultSizes] as [number, number];
    }
    get elementId(): string {
      return `#${this.name}-ui`;
    }
    abstract get name(): string;
    abstract createElement(): any;
    abstract parseEvent(v: any): number|number[];
    get elementPosition(): [number, number]| undefined  {
        if(!this.meta?.rect || !this.meta?.customLayout) return;
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
    constructor(override meta: CustomRNBOMetadata<T, UI>, public tag: string, public device: BaseDevice) {
        super(meta);
        console.log(this.device);
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

export abstract class ParameterUI<T extends 'Number'|'Enum', UI extends UIType<T>> extends UIInput<T, UI> {
    constructor(override meta: CustomRNBOMetadata<T, UI>, public param: Parameter) {
        super(meta);
    }
    get name() { return this.param.name; }
    get value(): number { return this.param.value }
    get numSteps(): number { return this.param?.steps ?? 0; }
    linkElementToParam() {
        this.element.on('change', (v: any) => {
            const value = this.parseEvent(v) as number;
            if(this.value !== value) {
                this.param.value = value;
            }
        });
    }
}




  