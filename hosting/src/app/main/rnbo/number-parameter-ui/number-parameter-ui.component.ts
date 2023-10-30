import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as RNBO from '@rnbo/js';
import Nexus from 'nexusui';
import { NumberParameterUI } from 'src/app/helpers/rnbo/inputs';
import { StylingService } from 'src/app/services/styling.service';
export interface ParameterStyle {
  labelsize?: number;
  uisize?: number;
  accent?: string;
  background?: string;
  fill?: string;
}
@Component({
  selector: 'app-number-parameter-ui',
 templateUrl: './number-parameter-ui.component.html',
  styleUrls: ['./number-parameter-ui.component.css']
})
export class NumberParameterUiComponent {
  @Input() paramUI!: (NumberParameterUI);
  @Input() paramStyle?: any; //  [number, number];
  dial_element!: any;
  constructor(public styling: StylingService) { }
  ngAfterViewInit(): void {
    console.log(`number-parameter-ui ${this.paramUI.name}`);
    const step = this.paramUI.numSteps;
    console.log(this.paramStyle);
    this.createDialElement(step, this.paramUI.value);
    this.dial_element.on('change', (value: number) => {
      this.paramUI.value = value;
      console.log(`parameter changed to ${value} with dial`);
    });
  }

  createDialElement(step: number, value: number) {
    let min: number, max: number, interaction: string, mode: string;
    [min, max, interaction, mode] = [0, 1, 'radial', 'relative'];
    this.dial_element = new Nexus.Dial('#nexus-dial', 
    {
      size: [100, 100],
      interaction: 'radial',
      mode: 'relative',
      min: 0,
      max: 1,
      steps: step,
      value: value
  });
  }

} 