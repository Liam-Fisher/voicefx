import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RnboDeviceComponent } from './rnbo-device/rnbo-device.component';
import { DeviceUiComponent } from './device-ui/device-ui.component';
import { PresetSelectComponent } from './preset-select/preset-select.component';



@NgModule({
  declarations: [
    RnboDeviceComponent,
    DeviceUiComponent,
    PresetSelectComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RnboDeviceComponent,
    
  ]
})
export class RnboModule { }
