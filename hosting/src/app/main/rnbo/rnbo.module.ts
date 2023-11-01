// Basic Angular Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Global UI components
// Device UI components
// import {DeviceMenuUI} from './ui/device-menu/device-menu-ui.component';
// import { ParameterUI } from './ui/parameter/parameter-ui.component';
// import { InportUI } from './ui/inport/inport-ui.component';

// Helpers
// import { RnboLoaderService } from './services/rnbo-loader.service';
// import { RnboEventHubService } from './services/rnbo-event-hub.service';
// Main Interface
import { NumberParameterUiComponent } from './number-parameter-ui/number-parameter-ui.component';
import { DeviceMenuUI } from './rnbo-device-menu/device-menu-ui.component';
import { DeviceUI } from './device-ui/device-ui.component';
import { EnumParameterUiComponent } from './enum-parameter-ui/enum-parameter-ui.component';
import { MessageInportUIComponent } from './message-inport-ui/message-inport-ui.component';
@NgModule({
  declarations: [
    DeviceUI,
    DeviceMenuUI, 
    NumberParameterUiComponent,
    EnumParameterUiComponent,
    MessageInportUIComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ 
    DeviceMenuUI, 
    DeviceUI,
    MessageInportUIComponent
  ],
  providers: []
})
export class RnboModule { }

