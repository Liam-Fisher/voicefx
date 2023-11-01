import { Component } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-audio-options',
  templateUrl: './audio-options.component.html',
  styleUrls: ['./audio-options.component.css']
})
export class AudioOptionsComponent {
  constructor(public audioService: AudioService) { }
  loadAudio() {
    console.log('loading audio');
    this.audioService.setupContext();

    console.log('loading audio');
  }
  testAudio() {
    this.audioService.testSound();
  }
}
