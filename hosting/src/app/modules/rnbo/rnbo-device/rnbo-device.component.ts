
import { ChangeDetectorRef, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RnboService } from 'src/app/services/rnbo/rnbo.service';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';
import { AudioService } from 'src/app/services/webAudio/audio.service';

type DeviceOptions = 'none'|'robot'|'alien';
@Component({
  selector: 'app-rnbo-device',
  templateUrl: './rnbo-device.component.html',
  styleUrls: ['./rnbo-device.component.css']
})
export class RnboDeviceComponent {
  //createUIElements = false;
  //style!: any;
  
  constructor(
      public rnboService: RnboService,
      public cdRef: ChangeDetectorRef,
      public audioService: AudioService      
      ) {
   }
  ngOnInit() {
      console.log(`initialized device ui`);
      this.rnboService.isDeviceLoaded.subscribe((deviceLoaded: boolean) => {
          console.log(`device loaded: ${deviceLoaded}`);
          if(this.audioService.isRecordingBufferLoaded.value) {
            this.rnboService.connectToRecording();
          }
          this.cdRef.detectChanges();
      });
  }
}