import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceSelectionMenuComponent } from './device-selection-menu/device-selection-menu.component';
import { MessageInputComponent } from './message-input/message-input.component';
import { RnboDeviceComponent } from './rnbo-device/rnbo-device.component';
import { DeviceUiComponent } from './device-ui/device-ui.component';
import { PresetUiComponent } from './preset-ui/preset-ui.component';



@NgModule({
  declarations: [
    DeviceSelectionMenuComponent,
    MessageInputComponent,
    RnboDeviceComponent,
    DeviceUiComponent,
    PresetUiComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RnboDeviceComponent
  ]
})
export class RnboModule { }
