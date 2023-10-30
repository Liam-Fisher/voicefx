import { InputAttributes, InputType } from "src/app/types/rnbo/deviceInput";
import { EnumParameterUI, ListInportUI, MessageInportUI, NumberParameterUI } from "./inputs";
type Metadata = {meta?: InputAttributes<InputType>};
import * as RNBO from '@rnbo/js';
export function sortParams() {
    for(let i=0; i<this.patcher.desc.numParameters; i++) {
      let desc = this.patcher.desc.parameters[i] as RNBO.IParameterDescription & Metadata;
      let param = this.device.parameters[i];
      if(desc.isEnum)  {
        this.enumParameters.push(
          new EnumParameterUI((desc?.meta ?? {
            'intype': 'Enum',
            'maxobj': 'umenu', 
            'hint': `hint for enum parameter ${i}: "${desc.name}"`
          }), param, desc))
      }
      else {
        this.numberParameters.push(
          new NumberParameterUI((desc?.meta ?? {
            'intype': 'Number',
            'maxobj': 'dial', 
            'hint': `hint for enum parameter ${i}: "${desc.name}"`
          }), param, desc));
      }
    }
}
export function sortInports() {
  for(let i=0; i<this.patcher.desc.inports.length; i++) {
    let desc = this.patcher.desc.inports[i] as  {tag: string, meta?: InputAttributes<InputType>};
    if(desc?.meta?.intype === 'List') {
      this.listInports.push(
        new ListInportUI((desc?.meta ?? {
          'intype': 'List',
          'maxobj': 'multislider', 
          'hint': `hint for list inport ${i}: "${desc.tag}"`
        }), desc.tag))
    }
    else {
      this.messageInports.push(
        new MessageInportUI((desc?.meta ?? {
          'intype': 'Message',
          'maxobj': 'textedit', 
          'hint': `hint for message inport ${i}: "${desc.tag}"`
        }),  desc.tag));
    }
  }
}