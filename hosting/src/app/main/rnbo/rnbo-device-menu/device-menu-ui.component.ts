import { Component, EventEmitter,Input, Output } from '@angular/core';

@Component({
  selector: 'app-device-menu-ui',
  templateUrl: './device-menu-ui.component.html',
  styleUrls: ['./device-menu-ui.component.scss']
})
export class DeviceMenuUI {
  @Input() deviceList: string[] | null = [];
  @Output() deviceSelected: EventEmitter<string> = new EventEmitter();
constructor() { }
ngOnInit() { }
  selectDevice(id: string) {
    console.log(`selected device ${id}`);
    this.deviceSelected.emit(id);
  }
}
