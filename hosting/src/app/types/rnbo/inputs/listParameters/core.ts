import { UIType } from "../attributes";
import { CustomRNBOMetadata } from "../dataTypes";
import { InportUI } from "../core";
import { BaseDevice } from "@rnbo/js";
export abstract class ListInportUI<UI extends UIType<'List'>> extends InportUI<'List', UI> {
    constructor(meta: CustomRNBOMetadata<'List', UI>, tag: string, device: BaseDevice) {
        super(meta, tag, device);
        console.log(`initialized ListInportUI UI`);
    }
    
    
}