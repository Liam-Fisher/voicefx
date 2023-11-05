import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordButtonComponent } from './record-button/record-button.component';
import { PlayButtonComponent } from './play-button/play-button.component';
import { MediaUiComponent } from './media-ui/media-ui.component';



@NgModule({
  declarations: [
    RecordButtonComponent,
    PlayButtonComponent,
    MediaUiComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
  /*   RecordButtonComponent,
    PlayButtonComponent
   */
    MediaUiComponent
  ]
})
export class RecordingModule { 


  
}
