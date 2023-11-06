import {Input, Component } from '@angular/core';
import { RnboService } from 'src/app/services/rnbo/rnbo.service';

@Component({
  selector: 'app-load-button',
  templateUrl: './load-button.component.html',
  styleUrls: ['./load-button.component.css']
})
export class LoadButtonComponent {
  @Input() size: number = 100;
  constructor(public rnboService: RnboService) { }
  ngOnInit() {
    this.rnboService.isDeviceLoaded.subscribe((val: boolean) => {

    });
  }
  connectToDevice() {
    this.rnboService.connectToRecording();
  }
}
