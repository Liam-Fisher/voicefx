import {Injectable} from '@angular/core';
import * as RNBO from '@rnbo/js';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { EnumParameterUI, ListInportUI, MessageInportUI, NumberParameterUI } from '../helpers/rnbo/inputs';
import { InputType } from '../types/rnbo/deviceInput';
type Metadata = {meta: Record<string, string>};
type Parameter = RNBO.IParameterDescription & Metadata;
type MessageInport =  Metadata & {
  tag: string;
};
@Injectable({
  providedIn: 'root'
})
export class StylingService {
  defaultContainerStyle = {
    'font-size.px': 12,
    'display': 'grid'
  };
  defaultParameterContainerStyles = {};
useDefault: boolean = true;
 // paramType: Set<string> = new Set(['menus', 'panels']);
  //gridAreas: Record<string, string> = {};
  gridLayout: Record<string, [string, string]> = {};
  
  numberOfPanels!: number;
  numberOfMenus!: number;
  labelLengths: { [key: string]: number } = {};
  resizeCount: number = 0;
  hasPiano!: boolean;
  envelope!: boolean;
  defaultDeviceUI: Record<string, any> = {

  }
  


  paramData: Record<string, any[]> = {};  
  uiData: Record<string, any[]> = {};
  // Device queries
  hasMouse!: boolean;
  //deviceUIwidth = new BehaviorSubject<number>(window.innerWidth);
  constructor() {
    this.hasMouse = window.matchMedia("(pointer: fine)").matches;
  } 
  get paramTypes(): string[] {
    return Object.keys(this.paramData);
  }

  styleNumberContainerUI(container: HTMLDivElement, parameters: NumberParameterUI[]) {
    let labelChars = this.evenNumberParameterWidth(parameters);
    let fontSize = +container.style.getPropertyValue('font-size').slice(0, -2);
    console.log(`parameter number container has  ${container.offsetWidth} width and fontSize ${fontSize}`);
    let parameterWidth = labelChars*fontSize+2;
    console.log(`parameter number container has width ${parameterWidth}`);
    let columns = Math.floor(container.offsetWidth/(labelChars*fontSize+2));
    console.log(`parameter number container has  ${container.offsetWidth} width and fontSize ${fontSize}`);
    console.log(`styling parameter number container with ${columns} columns`);
    return { 
      'display': 'grid',
      'grid-template-columns': `repeat(${columns}, 1fr)`,
      'grid-template-rows': 'auto'
    }
  }/* 
  styleEnumContainerUI(container: HTMLDivElement, parameters: EnumParameterUI[]) {
    let maxLabelLength = 0;
    for(let param of enumParameters) {
      let enumValues = param.enumValues;
      maxLabelLength = Math.max(
        param.name.length,
        maxLabelLength, 
        ...enumValues.map((el) => el.length));
    }
    let fontSize = +container.style.getPropertyValue('font-size').slice(0, -2);
    let columns = Math.floor(container.offsetWidth/(maxLabelLength *fontSize+2));
    console.log(`styling parameter number container with ${columns} columns`);
    return { 
      'grid-template-columns': `repeat(${columns}, 1fr)`,
      'grid-template-rows': 'auto'
    }
  } */
  parseNumberUIStyle(container: HTMLDivElement, section: HTMLDivElement, parameters: NumberParameterUI[]) {
    return { 'grid-template-rows': '1fr'}
  }
  styleListContainerUI(container: HTMLDivElement, parameters: NumberParameterUI[]) {
    return { 'grid-template-rows': '1fr'}
  }
evenNumberParameterWidth(parameters: NumberParameterUI[]): number {
  let maxLabelLength = 0;
  for(let param of parameters) {
    maxLabelLength = Math.max(maxLabelLength, param.name.length);
  }
  return maxLabelLength;
}
  changeLogger() {
    console.log(`window height: ${window.innerHeight}`);
    console.log(`window width: ${window.innerWidth}`);
  }
  maxLogger() {
    for(let key in this.paramData) {
      console.log(`${key} label length: ${this.labelLengths[key]}`);
      console.log(`default panel div size: ${this.defaultParamDivWidth(key)}`);
    }
  }
  paramLogger() {
    for(let key in this.paramData) {
      console.log(`${key} items: ${this.paramData[key].length}`);
      console.log(`${key} names: ${this.paramData[key].map(p => p.name).join()}`);
    }
  }
defaultEnumDivWidth(param: string): number {
  let labelPixels = this.labelLengths[param]*this.defaultContainerStyle['font-size.px'];
  return Math.max(Math.min(labelPixels, 250), 50);
  
}
defaultParamDivWidth(param: string): number {
  let labelPixels = this.labelLengths[param]*this.defaultContainerStyle['font-size.px'];
  return Math.max(Math.min(labelPixels, 250), 50);
}
defaultParamDivHeight(param: string): number {
  if(param === 'panel') {
    return this.defaultParamDivWidth(param);
  }
    return this.defaultContainerStyle['font-size.px']*2;
}

get viewportSize(): { width: number, height: number } {
    return { width: window.innerWidth, height: window.innerHeight };
}
  
}
