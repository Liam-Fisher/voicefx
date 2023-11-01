import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StylingService {
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
  defaultDeviceUI: Record<string, any> = {}
  


  paramData: Record<string, any[]> = {};  
  uiData: Record<string, any[]> = {};
  // Device queries
  hasMouse!: boolean;
  //deviceUIwidth = new BehaviorSubject<number>(window.innerWidth);
  constructor() {
    this.hasMouse = window.matchMedia("(pointer: fine)").matches;
  } 
  paramLogger() {
    for(let key in this.paramData) {
      console.log(`${key} items: ${this.paramData[key].length}`);
      console.log(`${key} names: ${this.paramData[key].map(p => p.name).join()}`);
    }
  }
calculateStringPixels(container: HTMLElement, stringLength: number): number {
  return stringLength*(+container.style.getPropertyValue('font-size').slice(0, -2));
}
get viewportSize(): { width: number, height: number } {
    return { width: window.innerWidth, height: window.innerHeight };
}
  
}
