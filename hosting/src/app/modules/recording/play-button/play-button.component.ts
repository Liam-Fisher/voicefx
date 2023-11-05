import {
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AudioService } from 'src/app/services/webAudio/audio.service';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.css'],
})
export class PlayButtonComponent {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  @ViewChild('progressCircle') progressCircle!: ElementRef;
  /*  audioSrc =
    'https://firebasestorage.googleapis.com/v0/b/rnbovoicefx.appspot.com/o/user_recordings%2Fpublic%2Ffr-CA-Wavenet-A_kitten_for_halloween.mp3?alt=media&token=ca9e0310-e3cc-4d6f-bf3a-c41b8bcb348b';
  */
  duration = 0;
  isPlaying = new BehaviorSubject(false);
  isLoaded = new BehaviorSubject(false);

  //@Output() isLoaded = new EventEmitter<boolean>();
  constructor(public audioService: AudioService) {}
  ngOnInit() {
    this.audioService.isAudioLoaded.subscribe((isLoaded) => {
      console.log(`isLoaded: ${isLoaded}`);
    });
  }
  get isReady() {
    return this.audioService.isRecordingBufferLoaded.asObservable();
  }
  beginPlayback() {
    if (!this.isPlaying.value && this.audioService) {
      const playbackBuffer = this.audioService.bufferSource;
      if (playbackBuffer) {
        console.log(
          `load bufferSource with duration of ${
            playbackBuffer?.buffer?.duration ?? 'unknown'
          }`
        );
        this.duration = playbackBuffer?.buffer?.duration ?? 0;
        this.progressCircle.nativeElement.style.setProperty(
          '--animation-duration',
          this.duration + 's'
        );
        this.isPlaying.next(true);
        playbackBuffer.start();
        playbackBuffer.onended = () => {
          this.progressCircle.nativeElement.style.setProperty(
            '--animation-duration',
            '0s'
          );
          console.log( `completed playback `);
          this.isPlaying.next(false);
        };
      }
    }
  }
}
