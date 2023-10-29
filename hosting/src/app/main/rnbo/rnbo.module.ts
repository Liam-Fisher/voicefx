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
import { RnboDeviceComponent } from './rnbo-device/rnbo-device.component';
import { ParameterUI } from './parameter/parameter-ui.component';
import { NumberParameterUiComponent } from './number-parameter-ui/number-parameter-ui.component';
@NgModule({
  declarations: [
   /*  InportUI,
    ParameterUI,
    DeviceMenuUI, */
    ParameterUI,
    RnboDeviceComponent,
    NumberParameterUiComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ 
    RnboDeviceComponent,
    NumberParameterUiComponent
  ],
  providers: []
})
export class RnboModule { }

