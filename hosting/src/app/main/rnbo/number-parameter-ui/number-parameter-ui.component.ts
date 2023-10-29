import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as RNBO from '@rnbo/js';
import Nexus from 'nexusui';
import { StyleService } from 'src/app/services/style.service';

@Component({
  selector: 'app-number-parameter-ui',
//  templateUrl: './number-parameter-ui.component.html',
  template: `
  <div class="number-param-ui-container"
  [ngStyle]="{
    'width': paramStyle?.size ?? 100,
    'height': paramStyle?.size ?? 100
  }"
  >
    <label 
    class="number-param-label" 
    for="nexus-dial"
    >{{param.name}}
  </label>
        <div id="nexus-dial"></div>
  </div>`,
  styles: [`
  .number-param-ui-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }`
]
  //styleUrls: ['./number-parameter-ui.component.css']
})
export class NumberParameterUiComponent {
  @Input() param!: (RNBO.NumberParameter); //
  @Input() paramStyle?: any; //  [number, number];
  dial_element!: any;
  constructor(public style: StyleService) { }
  ngAfterViewInit(): void {
    console.log(`parameter-ui ${this.param.id}: ${this.param.name}`);
    const step = this.steps;
    console.log(this.paramStyle);
    this.createDialElement(step, this.param.value);

    this.dial_element.on('change', (value: number) => {
      this.param.value = value;
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

  denorm(norm: number): number {
      return this.param.convertFromNormalizedValue(norm);
  } 
get displayValue(): string {
    return `${this.denorm(this.param.value).toFixed(2)} ${this.param.unit}`;
}
// from parameterStyle
  get steps(): number {
    return this.param?.steps ? this.param.steps/(this.denorm(1) - this.denorm(0)) : 0;
  }
} 