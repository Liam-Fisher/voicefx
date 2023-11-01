import { Component } from '@angular/core';
import {  BehaviorSubject, Observable, from } from 'rxjs';
import { AudioService } from 'src/app/services/audio.service';

import { DatabaseService } from 'src/app/services/database.service';
import { RnboService } from 'src/app/services/rnbo.service';

@Component({
  selector: 'app-voice-fx-page',
  templateUrl: './voice-fx-page.component.html',
  styleUrls: ['./voice-fx-page.component.css']
})
export class VoiceFxPageComponent {
  
  activeDevice= new BehaviorSubject('');
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
    this.recordingIDs = from(this.rnboService.loadRecordingsList());
    this.recordingIDs.subscribe((recordingIDs: string[]) => {
      console.log(`recordingIDs: ${recordingIDs}`);
    });
   }
}