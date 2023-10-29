import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import * as RNBO from '@rnbo/js';
import Nexus from 'nexusui';
import {NumberParameter, EnumParameter} from '@rnbo/js';
import { ParameterMetadata } from 'src/app/types/nexusui/elements';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-parameter-ui',
  template: `
  <div class="slider-ui-element-container" *ngIf="parameterData.type === 0">
    <p class="parameter-value-label">{{parameterData.id}}</p>
        <span id="nexus-ui-element" *ngIf="element|async"></span>
        <span id="number-ui" *ngIf="number_element|async"><!-- add parameterData?.unit --></span>
  </div>
    <div class="enum-ui-element-container" *ngIf="parameterData.type === 5">
    <p class="parameter-value-label">{{parameterData.id}}</p>
        <span id="nexus-ui-element" *ngIf="element|async"></span>
  </div>
  `,
  styleUrls: ['./parameter-ui.component.css']
})
export class ParameterUI  {
  @Input() precision!: number; // number of decimal places in the value. 
  @Input() parameterData!: (NumberParameter|EnumParameter) & {meta: ParameterMetadata<'enum'|'number'>};
  @Input() parameterSize?: [number, number];
  @Input() isNormalized?: boolean|undefined;
  isNumber!: Observable<boolean>; 
  elementType: ParameterMetadata<'enum'|'number'>['element']
  element!: any;
  number_element!: any;
  @Output() update: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    console.log(`parameter-ui: ${this.parameterData.id}`);
    console.log(this.parameterData);
    const metadata = this.parameterData.meta;
    if(this.parameterData instanceof EnumParameter) {
      console.log('enum parameter');
      this.elementType = metadata.element as ParameterMetadata<'enum'>['element'];
      switch(this.elementType) {
        case 'Select':
        break;
        case 'RadioButton':
          break;
        default:
          console.error(`unknown parameter type ${metadata.element}`);
      }
    }
    else {
      this.elementType = metadata.element as ParameterMetadata<'number'>['element'];
      const {min, max, value} = this.parameterData;
      const step = this.getStep(min, max, this.parameterData.steps);
      let mode: string;
      let size: [number, number];
      switch(this.elementType) {
        case 'Dial':     
          const interaction  = 'radial';
          mode =  'relative';
          this.parameterSize ??= [50, 50];
          size = this.parameterSize;
          this.element = new Nexus.Dial('#nexus-ui-element',{size, interaction, mode, step, min, max, value});
          size[1] *= 0.5;
          this.number_element = new Nexus.Number('#number-ui',{size, step, min, max, value});
        break;
        case 'Slider':
          mode =  'absolute';
          this.parameterSize ??= [50, 50];
          size = this.parameterSize;
          this.element = new Nexus.Slider('#nexus-ui-element',{size, mode, step, min, max, value});
          size[1] *= 0.5;
          this.number_element = new Nexus.Number('#number-ui',{size, step, min, max, value});
        break;
        default:
          console.error(`unknown parameter type ${metadata.element}`);
      }
    }
    this.element.on('change', (value: number) => {
      console.log(`slider released`);
      this.update.emit(value);
    });
  }
  
 formatLabel(value: number): string {
    let scale = Math.pow(10, this.precision ?? 1);    
    if(this.isNormalized) {
      return `${Math.round(value*scale)/scale}${this.parameterData?.unit ?? ''}`;
    }
    else {
      return `${Math.round(value*scale)/scale}${this.parameterData?.unit ?? ''}`;
    }
  }
  // convert from RNBO NumSteps to AngularMaterial StepSize
  getStep(min: number, max: number, steps?: number) {
    return steps ? steps/(max - min) : 0;
  }
}
