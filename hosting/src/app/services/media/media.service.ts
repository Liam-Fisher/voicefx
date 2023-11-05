import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { recordAudioInput } from './helpers/recording';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  isAudioFileUploadActive = new BehaviorSubject(false);
  isRecordingActive = new BehaviorSubject(false);
  isPlaybackActive = new BehaviorSubject(false);
  audioURL = new BehaviorSubject('');
  mediaRecorder: MediaRecorder | null = null;
  audioChunks: Blob[] = [];
  recordedAudio: Blob | null = null;
  recordedFiles: File[] = [];
  recordingTimeout: any = null;
  maxRecordingTime = 2000;
  constructor() { 
  }
  set isRecording(state: boolean) {
    this.isRecordingActive.next(state);
  }
  createFile() {
    if(this.recordedAudio) {
    const file = new File([this.recordedAudio], `voicefx_${this.recordedFiles.length}`, { type: 'audio/wav' });
    this.recordedFiles.push(file);
  }
} 
}
