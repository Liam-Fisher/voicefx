import { EnumParameter } from "@rnbo/js";
import * as Nexus from 'nexusui';
import { rgbToHex } from "../helpers/styling";
import { EnumParameterUI } from "./core";
import { CustomRNBOMetadata } from "../dataTypes";

export class SelectUI extends EnumParameterUI<'umenu'> {
    constructor(override meta: CustomRNBOMetadata<'Enum', 'umenu'>, override param: EnumParameter) {
        super(meta, param);
    }
    get selected() {
        return this.element.value;
    }
    createElement() {
    // the default mode 'relative' is always used
        this.element =  new Nexus.Select(this.elementId, { size: this.size, options: this.param.enumValues} );
        if(this.meta?.textcolor) {
            this.element.colorize('accent', rgbToHex(this.meta?.textcolor))
    };
        if(this.meta?.bgcolor) {
            this.element.colorize('fill', rgbToHex(this.meta.bgcolor));
    }
        this.linkElementToParam();
    }
    parseEvent({value, index}: {value: string, index: number}): number {
        return index;
    }
}