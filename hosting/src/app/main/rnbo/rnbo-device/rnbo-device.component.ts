import {
  Component,
  Input
} from '@angular/core';
import * as RNBO from '@rnbo/js';
import { BehaviorSubject, Observable } from 'rxjs';
import { RnboService } from 'src/app/services/rnbo.service';
import { StylingService } from 'src/app/services/styling.service';

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
  @Input() deviceID = new BehaviorSubject<string>('');
  @Input() bufferIDs = new BehaviorSubject<string[]>([]);
  @Input() isDeviceLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);


  //@Input() recordingIDs = new BehaviorSubject<string[]>([]);
  //@Output() deviceLoadEvent: EventEmitter<string[]> = new EventEmitter();
  constructor(
    public rnboService: RnboService,
    public styling: StylingService
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
      folder: this.device_type
    })) as RNBO.BaseDevice;
    this.isDeviceLoaded.next(true);
    this.bufferIDs.next(this.buf_ids);
//   this.recordingIDs.next(await this.rnboService.loadRecordingsList());
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
  get inports(): RNBO.MessageInfo[] {
    return this?.device?.inports ?? [];
  }
  get buf_ids(): string[] {
    return this.device.dataBufferDescriptions.map(
      (dBD: RNBO.ExternalDataInfo) => dBD.id
    );
  }
}