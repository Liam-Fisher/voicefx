import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecordingUIComponent } from './recording-ui/recording-ui.component';
import { VoiceFxPageComponent } from './voice-fx-page/voice-fx-page.component';
import { RnboModule } from '../rnbo/rnbo.module';
@NgModule({
  declarations: [
    RecordingUIComponent,
    VoiceFxPageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RnboModule
    
  ],
  exports: [ 
    VoiceFxPageComponent
  ]
})
export class VoiceFxModule { }
