import {
  Component,
  Input
} from '@angular/core';
import * as RNBO from '@rnbo/js';
import { BehaviorSubject, Observable } from 'rxjs';
import { RnboService } from 'src/app/services/rnbo.service';
import { ParameterStyleMetadata } from 'src/app/types/nexusui/elements';

@Component({
  selector: 'app-rnbo-device',
  templateUrl: './rnbo-device.component.html',
  styleUrls: ['./rnbo-device.component.css'],
})
export class RnboDeviceComponent {
  @Input() device_type!: string;
  @Input() isAudioLoaded!: BehaviorSubject<boolean>;
  @Input() deviceList!: Observable<string[]>;
  device!: RNBO.BaseDevice;
  pStyles: ParameterStyleMetadata = {
    backgroundcolor: '#666666',
    textcolor: '#000000',
    fillcolor: '#ffffff',
    needlecolor: "#66ffaa",
    size: 100,
    hint: 'a parameter'
  };
  @Input() deviceID = new BehaviorSubject<string>('');
  @Input() bufferIDs = new BehaviorSubject<string[]>([]);
  @Input() isDeviceLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);
  //@Input() recordingIDs = new BehaviorSubject<string[]>([]);
  //@Output() deviceLoadEvent: EventEmitter<string[]> = new EventEmitter();
  constructor(
    private rnboService: RnboService
  ) {}
  ngOnDestroy() { /* figure this out before user-defined routing */}
/*   ngOnInit() {
    this.deviceList = from(this.rnboService.loadDeviceList(this.device_type));
  } */
  async updateDevice(evt: any) {
    let id =  evt.target?.value ?? '';
    if(!id || this.deviceID.value === id || typeof id !== 'string') {
      this.deviceID.next(id);
    }
    console.log(`loading device ${id}`);
    this.isDeviceLoaded.next(false);
    this.device = (await this.rnboService.loadDevice(id, {
      folder: this.device_type,
      logDevice: true,
      logPatcher: true,
    })) as RNBO.BaseDevice;
    /* if(this.target) {
      this.device.messageEvent.subscribe((ev) => {
        if(ev.tag === 'noteout') {
          this.rnboService.emitSyncEvent('message', ['notein', ev.payload as number[]], this.target);
        }
      });
    }  */
//    this.recordingIDs.next(await this.rnboService.loadRecordingsList());
    this.isDeviceLoaded.next(true);
    this.bufferIDs.next(this.buf_ids);
    //this.deviceLoadEvent.emit([device_id, ...this.buf_ids]);
  }
  // Reroute this event handling the the evnet-hub service once timing is enabled
  updateParameter(valueChangeEvent: any, parameterIndex: number) {
    console.log(`setting parameter ${parameterIndex} to ${valueChangeEvent}`);
    if (this?.device?.numParameters > parameterIndex) {
      console.log(`setting parameter ${parameterIndex} to ${valueChangeEvent}`);
      this.device.parameters[parameterIndex].value = valueChangeEvent;
    } 
  }
  get params(): RNBO.Parameter[] {
    return this?.device?.parameters ?? [];
  }
  get inports(): RNBO.MessageInfo[] {
    return this?.device?.inports ?? [];
  }
  get buf_ids(): string[] {
    return this.device.dataBufferDescriptions.map(
      (dBD: RNBO.ExternalDataInfo) => dBD.id
    );
  }
  /* setTempo(tempo: MatSliderDragEvent) {
    console.log(`tempo changed`);
    
    this.rnboService.emitSyncEvent('tempo',tempo.value, 'scoreReader');
  }
  togglePlayback(e: boolean) {
    let msgEvt = new RNBO.MessageEvent(RNBO.TimeNow, 'on', +e);
    this.device.scheduleEvent(msgEvt);
  } */
}