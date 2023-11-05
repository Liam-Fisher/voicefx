import { EnumParameter, NumberParameter } from '@rnbo/js';
import { InputAttributes } from '../types/attributes';
import PianoUI from '../inputs/elements/kslider';
import EnvelopeUI from '../inputs/elements/function';
import { SelectUI } from '../inputs/elements/select';
import { ToggleUI } from '../inputs/elements/toggle';
import DialUI from '../inputs/elements/dial';
import SliderUI from '../inputs/elements/slider';
import NumberUI from '../inputs/elements/number';

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
    this.uiNames.push(['list', name]);
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
    if(meta.messageOnly) {
      continue;  
    }
    let param = this.device.parameters[i];
    let name = param.name;
   /*  if(this.uis.has(name)) {
      continue;
    } */
    if(desc.isEnum)  {
      this.uiNames.push(['enum', name]);
      meta ??= {'maxobj': 'umenu'};
      console.log(`enum meta`, meta);
      console.log(`enum param`, param);
      
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
      this.uiNames.push(['number', name]);
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