import {Injectable} from '@angular/core';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { Param } from './testParams';

export type Param = {
  type: string;
  enumValues: string[];
  name: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  defaultContainerStyle = {
    'font-size.px': 12,
    'display': 'grid'
  };
  defaultParameterContainerStyles = {};

 // paramType: Set<string> = new Set(['menus', 'panels']);
  //gridAreas: Record<string, string> = {};
  gridLayout: Record<string, [string, string]> = {};
  
  numberOfPanels!: number;
  numberOfMenus!: number;
  labelLengths: { [key: string]: number } = {};
  resizeCount: number = 0;
  hasPiano!: boolean;
  envelope!: boolean;
  paramStyle: Param[] = [];
  paramData: Record<string, Param[]> = {};  
  // Device queries
  hasMouse!: boolean;
  //deviceUIwidth = new BehaviorSubject<number>(window.innerWidth);
  constructor() {
    this.hasMouse = window.matchMedia("(pointer: fine)").matches;

  }
  get paramTypes(): string[] {
    return Object.keys(this.paramData);
  }
  getGridArea(paramType: string) {
    console.log(`styling grid rows for ${paramType}: ${this.gridLayout?.[paramType][0]}`);
    console.log(`styling grid columns for ${paramType}: ${this.gridLayout?.[paramType][1]}`);
    
    return {
      'grid-template-rows': this.gridLayout?.[paramType][0],
      'grid-template-columns': this.gridLayout?.[paramType][1]
    };
  }
  
  createUILayout(p: Param[]) {
    this.changeLogger();
    this.parseParams(p);
    this.maxLogger();
    this.createGrids();
    this.paramLogger();
  }
  parseParams(p: Param[]) {
    console.log(p);
    for(let param of p) {
      console.log(`parsing param ${param.name}`);
      let t = param.type;
      this.paramData[t] ??= [];
      this.labelLengths[t] ??= 0;
      let maxLabelLength = param.name.length;
      if(param.enumValues.length) {
        maxLabelLength = Math.max(maxLabelLength, 
          ...param.enumValues.map((el) => el.length));
      }
      this.labelLengths[t] = Math.max(this.labelLengths[t], maxLabelLength);
      this.paramData[t].push(param);
    }
  }
  createGrids() {
    for(let key in this.paramData) {
      console.log(`creating ${key} grid`);
        let areas = this.createParameterGrid(
          this.paramData[key].map(p => p.name), 
          this.defaultParamDivWidth(key), 
          this.defaultParamDivHeight(key), 
          window.innerWidth
          );
        console.log(`grid template rows: for ${key} ${areas[0]}`);
        console.log(`grid template columns: for ${key} ${areas[1]}`);
        
        this.gridLayout[key] = areas;
      }
  }
  createParameterGrid(items: string[], width: number, height: number, containerWidth: number): [string, string] {

    let itemCount = items.length; 
    let rows = 1;
    let columns = itemCount;
    let rowLength = width*itemCount;
    let gridTemplateRows: string;
    let gridTemplateColumns: string;


    console.log(`placing ${itemCount} items: row length is ${rowLength} and containerWidth is ${containerWidth}`);
    console.log(`param width is ${width}`);
    if(rowLength > containerWidth) {
      rows =  Math.ceil(rowLength/containerWidth);
      columns = Math.floor(itemCount/rows);
    }

    console.log(`row grid dimensions: ${rows} x ${columns}`);
    gridTemplateRows = `${height}px `.repeat(rows).trim();
    gridTemplateColumns = `${width}px `.repeat(columns).trim();
    return [gridTemplateRows, gridTemplateColumns];
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
