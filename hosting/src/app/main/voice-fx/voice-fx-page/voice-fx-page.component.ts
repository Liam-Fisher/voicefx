import { Component, Input, ViewChild } from '@angular/core';
import {  BehaviorSubject, Observable, from } from 'rxjs';
import { AudioService } from 'src/app/services/audio.service';

import { DatabaseService } from 'src/app/services/database.service';
import { RnboService } from 'src/app/services/rnbo.service';
import { RnboDeviceComponent } from '../../rnbo/rnbo-device/rnbo-device.component';

@Component({
  selector: 'app-voice-fx-page',
  templateUrl: './voice-fx-page.component.html',
  styleUrls: ['./voice-fx-page.component.css']
})
export class VoiceFxPageComponent {
  
  @ViewChild('fxDevice') device!: RnboDeviceComponent;
  activeDevice= new BehaviorSubject('');
  isAudioLoaded = new BehaviorSubject(false);
  isDeviceLoaded = new BehaviorSubject(false);
  deviceID = new BehaviorSubject<string>('');
  bufferIDs = new BehaviorSubject<string[]>([]);
  // from db
  deviceList!: Observable<string[]>;
  recordingIDs!: Observable<string[]>;
  
  selectedRecordings = new BehaviorSubject<string[]>([]);
  constructor(
    public audioService: AudioService, 
    public dbService: DatabaseService,
    public rnboService: RnboService
    ) { }
  ngOnInit() {
    
    this.deviceList = from(this.rnboService.loadDeviceList('voice-fx'));
    this.recordingIDs = from(this.rnboService.loadRecordingsList());
    this.recordingIDs.subscribe((recordingIDs: string[]) => {
      console.log(`recordingIDs: ${recordingIDs}`);
    });
   }
  loadAudio() {
    this.isAudioLoaded.next(this.audioService.setupContext());
  }
  testAudio() {
    this.audioService.testSound();
  }
  loadRecordingIntoBuffer(event: [string, string]) {
    let [buffer_id, buffer_src] = event;
    buffer_src = `user_recordings/${buffer_src}`;
    let device_id = this.deviceID.value;
    let channelCount = 1;
    this.rnboService.loadBuffer({buffer_id, buffer_src}, {device_id, channelCount});
  }
}