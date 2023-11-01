import { Component, Input } from '@angular/core';
import * as RNBO from '@rnbo/js';
import Nexus from 'nexusui';
import { StylingService } from 'src/app/services/styling.service';

@Component({
  selector: 'app-enum-parameter-ui',
  templateUrl: './enum-parameter-ui.component.html',
  styleUrls: ['./enum-parameter-ui.component.css']
})
export class EnumParameterUiComponent {
  dial_element!: any;
  constructor(public styling: StylingService) { }

createSelectElement() {

}

} 