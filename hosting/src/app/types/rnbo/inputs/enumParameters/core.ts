import { EnumParameter } from "@rnbo/js";
import { UIType } from "../attributes";
import { CustomRNBOMetadata } from "../dataTypes";
import { ParameterUI } from "../core";
export abstract class EnumParameterUI<UI extends UIType<'Enum'>> extends ParameterUI<'Enum',UI> {
    stringEnum: boolean;
    constructor(override meta: CustomRNBOMetadata<'Enum', UI>, override param: EnumParameter) {
        super(meta, param);
        this.stringEnum = this.param.enumValues.every(el => typeof el === 'string');
    }
}