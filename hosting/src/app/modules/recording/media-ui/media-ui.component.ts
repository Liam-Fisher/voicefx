import { ChangeDetectorRef, Component } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { AudioService } from 'src/app/services/webAudio/audio.service';
@Component({
  selector: 'app-media-ui',
  templateUrl: './media-ui.component.html',
  styleUrls: ['./media-ui.component.css']
})
export class MediaUiComponent {
    showAudioPlayer = new BehaviorSubject(false);
    constructor(public audioService: AudioService, public cdRef: ChangeDetectorRef) { }
    ngOnInit(): void {
      this.audioService.isRecordingBufferLoaded.subscribe((isLoaded) => {
        console.log(`isLoaded: ${isLoaded}`);
        this.showAudioPlayer.next(isLoaded);  
        this.cdRef.detectChanges();
      });
    }
}
