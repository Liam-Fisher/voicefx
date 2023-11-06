import { ChangeDetectorRef, Component } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { StylingService } from 'src/app/services/styling.service';
import { AudioService } from 'src/app/services/webAudio/audio.service';
@Component({
  selector: 'app-media-ui',
  templateUrl: './media-ui.component.html',
  styleUrls: ['./media-ui.component.css']
})
export class MediaUiComponent {
    showAudioPlayer = new BehaviorSubject(false);
    constructor(
      public audioService: AudioService, 
      public cdRef: ChangeDetectorRef, 
      public styling: StylingService) { }
    ngOnInit(): void {
      this.audioService.isRecordingBufferLoaded.subscribe((isLoaded: boolean) => {
        console.log(`isLoaded: ${isLoaded}`);
        this.showAudioPlayer.next(isLoaded);  
        this.cdRef.detectChanges();
      });
    }
}
