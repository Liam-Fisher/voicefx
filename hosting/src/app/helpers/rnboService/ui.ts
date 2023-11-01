import { EnumParameter, NumberParameter, Parameter } from '@rnbo/js';
import { InputAttributes, UIType } from 'src/app/types/rnbo/inputs/attributes';
import { SelectUI } from 'src/app/types/rnbo/inputs/enumParameters/select';
import { ToggleUI } from 'src/app/types/rnbo/inputs/enumParameters/toggle';
import EnvelopeUI from 'src/app/types/rnbo/inputs/listParameters/function';
import PianoUI from 'src/app/types/rnbo/inputs/listParameters/kslider';
import DialUI from 'src/app/types/rnbo/inputs/numberParameters/dial';
import NumberUI from 'src/app/types/rnbo/inputs/numberParameters/number';
import SliderUI from 'src/app/types/rnbo/inputs/numberParameters/slider';

export function initializeInportUIs() {
  for(let i=0; i<this.patcher.desc.inports.length; i++) {
    let desc = this.patcher.desc.inports[i];
    let meta = desc?.meta;
    console.log(`inport meta`);
    console.log(meta);
    let name = desc?.tag;
    if(!meta||(meta?.maxobj === 'textedit')) {
      continue;
    }
    this.uiNames.push(name);
    switch(meta.maxobj) {
        case 'kslider':
          this.uiElements.push((new PianoUI(meta as InputAttributes<'List', 'kslider'>, name, this.device)));
          break;
        case 'function':
          this.uiElements.push((new EnvelopeUI(meta as InputAttributes<'List', 'function'>, name, this.device)));
          break;
        default: 
          throw new Error(`Unknown maxobj ${meta.maxobj}`);
      }
    }
  }
export function initializeParameterUIs() {
  for(let i=0; i<this.patcher.desc.numParameters; i++) {
    let desc = this.patcher.desc.parameters[i];
    let meta = desc?.meta;
    let param = this.device.parameters[i];
    let name = param.name;
   /*  if(this.uis.has(name)) {
      continue;
    } */
    this.uiNames.push(name);
    if(desc.isEnum)  {
      meta ??= {'maxobj': 'umenu'};
      switch(meta.maxobj) {
        case 'umenu':
          this.uiElements.push((new SelectUI(meta as InputAttributes<'Enum', 'umenu'>, param as EnumParameter)));
          break;
        case 'toggle':
          this.uiElements.push((new ToggleUI(meta as InputAttributes<'Enum', 'toggle'>, param as EnumParameter)));
          break;
        default: 
          throw new Error(`Unknown maxobj ${meta.maxobj}`);
      }
    }
    else {
      meta ??= {'maxobj': 'dial'};
      switch(meta.maxobj) {
        case 'dial':
          this.uiElements.push((new DialUI(meta as InputAttributes<'Number', 'dial'>, param as NumberParameter)));
          break;
        case 'slider':
          this.uiElements.push((new SliderUI(meta as InputAttributes<'Number', 'slider'>, param as NumberParameter)));
          break;
          case 'number':
            this.uiElements.push((new NumberUI(meta as InputAttributes<'Number', 'number'>, param as NumberParameter)));
            break;
        default: 
          throw new Error(`Unknown maxobj ${meta.maxob}`);
      }
    }
  }
}