

import { ChangeDetectorRef, Component,ElementRef, ViewChild  } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AudioService } from 'src/app/services/webAudio/audio.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-recording-ui',
 templateUrl: './recording-ui.component.html',
  styleUrls: ['./recording-ui.component.css']
})
export class RecordingUIComponent {
  mediaRecorder: MediaRecorder | null = null;
  recordingTime = 2000;
  filename: string = '';
  audioChunks: Blob[] = [];
  isRecording = new BehaviorSubject(false);
  isPlaying = new BehaviorSubject(false);
  isUploading = new BehaviorSubject(false);
  @ViewChild('audioPlayer', { static: false }) audioPlayer!: ElementRef<HTMLAudioElement>;
  @ViewChild('fileUploadDialog', { static: false }) uploadDialog!: ElementRef<HTMLDialogElement>;
  
  recordedAudio: Blob | null = null;
  constructor(private cdRef: ChangeDetectorRef, private db: DatabaseService, private audioService: AudioService) {} 
  formatLabel(value: number) {
    return `${Math.round(value/1000)} seconds`;
  }
  closeUploadDialog(wasCancelled: boolean) {
    this.uploadDialog.nativeElement.close();
    if(this.filename !== '' && !wasCancelled) {
      this.isUploading.next(true);
      this.uploadFile().then(() => {
        this.filename = '';
        this.isUploading.next(false);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
        this.isUploading.next(false);
      });
    }
    else {
      this.filename = '';
    }
  }
  startRecording() {
    this.isRecording.next(true);
    this.cdRef.detectChanges();
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            this.audioChunks.push(e.data);
          }
        };
        this.mediaRecorder.onstop = () => {
          console.log('recording stopped');
          this.recordedAudio = new Blob(this.audioChunks, { type: 'audio/wav' });
          this.loadAudio();
          this.audioChunks = [];
        };
        this.mediaRecorder.start();
        console.log(`recording for ${this.recordingTime}ms`);
        setTimeout(() => {
          this.mediaRecorder?.stop();
          this.isRecording.next(false);
          
        }, this.recordingTime);
      })
      .catch((error) => {
        console.error('Error accessing the microphone:', error);
        this.isRecording.next(false);
      });
  }

  loadAudio() {
    if (this.recordedAudio) {
      const audioURL = URL.createObjectURL(this.recordedAudio);
      this.audioPlayer.nativeElement.src = audioURL;
      this.cdRef.detectChanges();
      this.audioPlayer.nativeElement.onplay = () => this.isPlaying.next(true);
      this.audioPlayer.nativeElement.onended = () => this.isPlaying.next(false);
    }
  }

  async uploadFile() {
      console.log(`uploading filename ${this.filename}`);
      const file = await this.audioService.createFile(this.recordedAudio as Blob, this.filename);
      this.isUploading.next(true);
      await this.db.uploadFile(file as File, `user_recordings/public/${this.filename}`);
      this.uploadDialog.nativeElement.close();
      console.log(`uploaded filename ${this.filename}`);
      this.isUploading.next(false);
    }
}
