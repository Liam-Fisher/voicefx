import { ChangeDetectorRef, Component } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { RnboService } from 'src/app/services/rnbo/rnbo.service';
import { StylingService } from 'src/app/services/styling.service';
import { AudioService } from 'src/app/services/webAudio/audio.service';
@Component({
  selector: 'app-media-ui',
  templateUrl: './media-ui.component.html',
  styleUrls: ['./media-ui.component.css']
})
export class MediaUiComponent {
    showLoadButton = new BehaviorSubject(false);
    showAudioPlayer = new BehaviorSubject(false);
    constructor(
      public audioService: AudioService,
      public rnboService: RnboService, 
      public styling: StylingService,
      public cdRef: ChangeDetectorRef) { }
    ngOnInit(): void {
      // BAD RXJS :(
        // fix later
      this.audioService.isRecordingBufferLoaded.subscribe((isLoaded: boolean) => {
        console.log(`isLoaded: ${isLoaded}`);
        this.showAudioPlayer.next(isLoaded);  
        this.showLoadButton.next(isLoaded&&this.rnboService.isDeviceLoaded.value);
        this.cdRef.detectChanges();
      });
      this.rnboService.isDeviceLoaded.subscribe((isLoaded: boolean) => {
        console.log(`isLoaded: ${isLoaded}`);
        this.showLoadButton.next(isLoaded&&this.audioService.isRecordingBufferLoaded.value);
        this.cdRef.detectChanges();
      });
    }
}
