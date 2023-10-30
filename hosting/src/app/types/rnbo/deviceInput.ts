import * as RNBO from '@rnbo/js';
export type InputType = 'Number' | 'Enum' | 'List' | 'Message';
// number parameter, enum parameter, inport,  signal, enum, list,
export enum NumberInputUI {
  dial,
}
export enum EnumInputUI {
  umenu,
}

export enum InportInputUI {
  multislider,
}

export enum MessageInputUI {
  textedit,
}
export type InputUIType<T extends InputType> = 
T extends 'Number'
  ? keyof typeof NumberInputUI
  : T extends 'Enum'
  ? keyof typeof EnumInputUI
  : T extends 'List'
  ? keyof typeof InportInputUI
  : keyof typeof MessageInputUI;

export type InputAttributes<T extends InputType> = {
  intype: InputType;
  maxobj: InputUIType<InputType>;
  hint?: string;
};

export type Input<T extends InputType> = RNBO.IParameterDescription & {
  meta: InputAttributes<T>;
};

export interface InputMetadata {
  maxobj: string;
  hint: string;
  customLayout?: boolean;
  rect?: [number, number, number, number];
}

export type UINumber = {
  param: RNBO.NumberParameter;
  desc: RNBO.IParameterDescription;
  meta: InputAttributes<'Number'>;
};

export type UIEnum = {
  param: RNBO.EnumParameter;
  desc: RNBO.IParameterDescription;
  meta: InputAttributes<'Enum'>;
};

export type UIList = {
  tag: string;
  meta: InputAttributes<'List'>;
};
export type UIMessage = {
  tag: string;
  meta: InputAttributes<'List'>;
};