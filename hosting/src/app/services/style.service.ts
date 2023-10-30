import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as RNBO from '@rnbo/js';
// 



@Injectable({
  providedIn: 'root'
})
export class StyleService {
  paramDivStyle = {
    backgroundcolor: '#666666',
    textcolor: '#000000',
    fillcolor: '#ffffff',
    needlecolor: "#66ffaa",
    size: 100,
    hint: 'a parameter'
  };
  #patcher!: RNBO.IPatcherDescription & {style?: any}
  style!: {
    'font-size.px': 12;
    'display': 'grid';
    'grid-template-areas': '"a a" "b b"'
  };


  numberOfNumberParameters!: number;
  numberOfEnumParameters!: number;
  longestDialLabelLength!: number;
  longestMenuLabelLength!: number;

  hasPiano!: boolean;
  envelope!: boolean;
  paramLayout: Record<string, number[][]> = {
    dials: [[]],
    menus: [[]]
  }  //Device queries
  hasMouse!: boolean;
  deviceUIwidth: BehaviorSubject<number> = new BehaviorSubject(100);
  deviceUIheight: BehaviorSubject<number> = new BehaviorSubject(100);
  constructor() {
    this.deviceUIwidth.next(window.innerWidth);
    this.deviceUIwidth.next(window.innerHeight);
    this.hasMouse = window.matchMedia("(pointer: fine)").matches;
    window.addEventListener('resize', () => {
      this.deviceUIwidth.next(window.innerWidth);
      this.deviceUIheight.next(window.innerHeight);
    });
  }
  set patcher(p: RNBO.IPatcher) {
    this.#patcher = p.desc as RNBO.IPatcherDescription & {style?: any};
    if(this.#patcher?.style){
      //Not yet impletemented
    }
    else {
      this.setDefaultLayoutMaxValues(p.desc);
    }
  }
  setDefaultLayoutMaxValues(p:  RNBO.IPatcherDescription) {
    this.numberOfNumberParameters = 0;
    this.numberOfEnumParameters =  0;
    this.longestDialLabelLength = 0;
    this.longestMenuLabelLength = 0;
    let longestMenuOptionLength = 0;
    for(let param of p.parameters) {
        if(param.isEnum) {
          console.log(`enum parameter`);
          let maxEnumValueLength = Math.max(...param.enumValues.map((el) => el.length));
          longestMenuOptionLength = Math.max(longestMenuOptionLength, maxEnumValueLength);
          this.longestMenuLabelLength = Math.max(this.longestMenuLabelLength, param.name.length);
          this.paramLayout['menus'][0].push(param.index);
        }
        else {
          console.log(`number parameter`);
          this.longestDialLabelLength = Math.max(this.longestDialLabelLength, param.name.length);
          this.paramLayout['dials'][0].push(param.index);
        }
      }
      this.longestMenuLabelLength = Math.max(this.longestMenuLabelLength, longestMenuOptionLength); 
  }
  createParameterGrid() {
      // try to fit all dials into a row, and all menus into another
      let numberRowCount = 1;
      let enumRowCount = 1;
      let numberRowLength =  (this.defaultNumberParameterDivSize*this.numberOfNumberParameters);
      let enumRowLength =  (this.defaultEnumParameterDivSize*this.numberOfEnumParameters);

      if(numberRowLength > window.innerWidth) {
        numberRowCount =  numberRowLength%window.innerWidth;
        numberRowLength = Math.ceil(window.innerWidth/numberRowCount);
      } 
      if(enumRowLength > window.innerWidth) {
        enumRowCount =  enumRowLength%window.innerWidth;
        enumRowLength = Math.ceil(window.innerWidth/enumRowCount);
      } 
      for(let i=0; i<numberRowCount; i++) {

      }

  }

 get defaultNumberParameterDivSize() {
      return Math.max(this.longestDialLabelLength*this.style['font-size.px'], 100); 
  }

 get defaultEnumParameterDivSize() {
  return Math.max(this.longestMenuLabelLength*this.style['font-size.px'], 100); 
}


  createDefaultLayout(p: patcher): any {
    // Device UI has 2 sections: parameter section and inport section
        // parameter section has two subsections: dials and menus
          
          // dials are squares with size based on:
          // the string length of the parameter name
        
          // menus are based on the  
          // the string length of the parameter name
        
    this.setDefaultLayoutMaxValues();



  }
  set inportUiStyleFromJSON(json: any) {
  }
  set paramUiStyleFromJSON(json: RNBO.IParameterDescription[]) {
    let columns = this.patcher.desc.parameters.length;

  }
  set uiStyleFromJSON(json: RNBO.IPatcherDescription) {

  }
  get viewportSize(): { width: number, height: number } {
    return { width: window.innerWidth, height: window.innerHeight };
  }
  
}
