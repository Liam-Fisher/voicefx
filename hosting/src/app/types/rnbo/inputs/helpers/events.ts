
import {   MessageEvent, Parameter } from "@rnbo/js";

export function linkElementToParam(param: Parameter) {
    this.element.addEventListener('change', (v: any) => {
        const value = this.parseEvent(v) as number;
        if(this.value !== value) {
            param.value = value;
        }
    });
}
export function linkElementToInport() {
    this.element.addEventListener('change', (v: any) => {
        this.data = this.parseEvent(v) as number[]; 
        if(this.sendOnChange) {
            this.element.emit('send');
        }
    });
    this.element.addEventListener('send', function() {
        this.device.scheduleEvent((new MessageEvent(0, this.tag, this.data)))
    });
}