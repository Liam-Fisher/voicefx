import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { DialComponent } from './dial/dial.component';
import { PianoUiComponent } from './piano-ui/piano-ui.component';



@NgModule({
  declarations: [
    ButtonComponent,
    DialComponent,
    PianoUiComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NexusModule { }
