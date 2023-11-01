import { EnumParameter, NumberParameter } from "@rnbo/js";
import { GenericAttributes, InputAttributes, InputType, UIType } from "./attributes";


export type CustomRNBOMetadata<T extends InputType, UI extends UIType<T>> = InputAttributes<T, UI> & GenericAttributes;

export type CustomRNBOInport<T extends 'List'|'Message', UI extends UIType<T>> = {
    tag:string
    meta: InputAttributes<T, UI> & GenericAttributes;
};



export type NumberUIData = {
    param: NumberParameter;
    meta: CustomRNBOMetadata<'Number', UIType<'Number'>>;
}
export type EnumUIData = {
    param: EnumParameter;
    meta: CustomRNBOMetadata<'Enum', UIType<'Enum'>>;
}
export type ListUIData = {
    tag: string;
    meta: CustomRNBOMetadata<'List', UIType<'List'>>;
}
export type MessageUIData = {
    tag: string;
    meta: CustomRNBOMetadata<'Message', UIType<'Message'>>;
}
