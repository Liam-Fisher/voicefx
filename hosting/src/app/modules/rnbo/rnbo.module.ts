import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RnboDeviceComponent } from './rnbo-device/rnbo-device.component';
import { EffectSelectUiComponent } from './effect-select-ui/effect-select-ui.component';
import { RobotDeviceComponent } from './voice-fx-devices/robot-device/robot-device.component';
import { MonsterDeviceComponent } from './voice-fx-devices/monster-device/monster-device.component';
import { DeviceUiComponent } from './device-ui/device-ui.component';



@NgModule({
  declarations: [
    RnboDeviceComponent,
    RobotDeviceComponent,
    EffectSelectUiComponent,
    MonsterDeviceComponent,
    DeviceUiComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RnboDeviceComponent
  ]
})
export class RnboModule { }
