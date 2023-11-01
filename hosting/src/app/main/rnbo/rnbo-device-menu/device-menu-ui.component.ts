import { Component, EventEmitter,Input, Output } from '@angular/core';
import { RnboService } from 'src/app/services/rnbo.service';
import {BehaviorSubject} from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
@Component({
  selector: 'app-device-menu-ui',
  templateUrl: './device-menu-ui.component.html',
  styleUrls: ['./device-menu-ui.component.css']
})
export class DeviceMenuUI {
  @Input() folder: string = 'voice-fx';
  deviceList = new BehaviorSubject<string[]>([]);
constructor(
  public db: DatabaseService,
  public rnboService: RnboService) { }
ngOnInit() { 
   this.db.listStorageNames(`rnbo_devices/${this.folder}`)
   .then((deviceList: string[]) => this.deviceList.next(deviceList))
   .catch((error: Error) => console.log(error));
}
  selectDevice(evt: any) {
    let id = evt.target.value as string;
    console.log(`selected device ${id}`);
    this.rnboService.loadDevice({id, folder: this.folder});
  }
}
