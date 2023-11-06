
import { Component, ViewChild,Input, ElementRef } from '@angular/core';
import { RnboService } from 'src/app/services/rnbo/rnbo.service';
import {BehaviorSubject} from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-device-selection-menu',
  templateUrl: './device-selection-menu.component.html',
  styleUrls: ['./device-selection-menu.component.css']
})
export class DeviceSelectionMenuComponent {
  @Input() folder: string = 'voice-fx';
  defaultText = new BehaviorSubject('select a device...');
  @ViewChild('rnbo_uploads') fileUpload!: ElementRef<HTMLInputElement>;
  selectedFile!: File;
  deviceList = new BehaviorSubject<string[]>([]);
constructor(
  public db: DatabaseService,
  public rnboService: RnboService) { }
ngOnInit() { 
   this.db.listStorageNames(`rnbo_devices/${this.folder}`)
   .then((deviceList: string[]) => {
    this.deviceList.next(deviceList);
    console.log(deviceList)
    const id= deviceList[0];
    this.rnboService.loadDevice({id, folder: this.folder});
  })
   .catch((error: Error) => console.log(error));
}
  selectDevice(evt: any) {
    let id = evt.target.value as string;
    
    console.log(`selected ${id}`);
    if(id === 'default') {
      return;
    }
      console.log(`selected device ${id}`);
      this.rnboService.loadDevice({id, folder: this.folder});
  } 
  uploadPatcherFile() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.click();
  }
  onFileSelected(event: any) {
    this.defaultText.next('...loading');
    this.selectedFile = event.target.files[0] as File;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const id = this.selectedFile.name.slice(0, -12);
        console.log(id);
        const patcher = JSON.parse(reader.result as string);
        this.rnboService.loadDevice({id, patcher}).then(() => this.defaultText.next(id))
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };
    reader.readAsText(this.selectedFile);
  }
}
