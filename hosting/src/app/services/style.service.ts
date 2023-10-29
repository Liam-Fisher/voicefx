import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as RNBO from '@rnbo/js';
// 


@Injectable({
  providedIn: 'root'
})
export class StyleService {
  paramStyle = {
    backgroundcolor: '#666666',
    textcolor: '#000000',
    fillcolor: '#ffffff',
    needlecolor: "#66ffaa",
    size: 100,
    hint: 'a parameter'
  };
  #patcher!: RNBO.IPatcherDescription & {style?: any}
  numberOfDials!: number;
  numberOfMenus!: number;
  hasKeyboard!: boolean;
  envelopes!: boolean;

  deviceUIwidth: BehaviorSubject<number> = new BehaviorSubject(100);
// Device UI has 2 sections: parameter section and inport section
    // parameter section is a grid layout based on the number of parameters
  constructor() {
    this.deviceUIwidth.next(window.innerWidth);
    window.addEventListener('resize', () => {
      this.deviceUIwidth.next(window.innerWidth);
    });
  }
  set patcher(p: RNBO.IPatcher) {
    this.#patcher = p.desc as RNBO.IPatcherDescription & {style?: any};
    if(this.#patcher?.style){
      //Not yet impletemented
    }
    else {

    }
  }
  get defaultLayout(): any {
    // Uses only dial parameters and select menus


    this.numberOfDials = 0;
    this.numberOfMenus =  0;
    for(let param of p.desc.parameters) {
        if(param.isEnum) {
          console.log(`enum parameter`);
          this.numberOfDials++;
        }
        else {
          console.log(`number parameter`);

        }
    }
    this.uiStyleFromJSON = p.desc;
    
  }
  set inportUiStyleFromJSON(json: any) {



  }
  set paramUiStyleFromJSON(json: RNBO.IParameterDescription[]) {
    let columns = this.patcher.desc.parameters.length;






  }
  set uiStyleFromJSON(json: RNBO.IPatcherDescription) {

  }
  get paramContainerStyle(): any {
    return {
      'width': this.paramStyle.size ?? 100,
      'height': this.paramStyle.size ?? 100
    };
  }
  get size(): number {
    return this.paramStyle.size ?? 0;
  }
  get dialSize(): number {
    return  this.paramStyle.size*0.7;
  }
  get labelSize(): number {
    return this.paramStyle.size*0.1;
  }
  get viewportSize(): { width: number, height: number } {
    return { width: window.innerWidth, height: window.innerHeight };
  }
  
}
