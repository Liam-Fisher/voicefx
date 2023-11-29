import { ChangeDetectorRef, Component } from '@angular/core';
import DialUI from 'src/app/services/rnbo/inputs/elements/dial';
import { RnboService } from 'src/app/services/rnbo/rnbo.service';

@Component({
  selector: 'app-robot-device',
  templateUrl: './robot-device.component.html',
  styleUrls: ['./robot-device.component.css']
})
export class RobotDeviceComponent {
  constructor(
    public rnboService: RnboService,
    public cdRef: ChangeDetectorRef
    ) {
 }
ngOnInit() {
    console.log(`initialized device ui`);
    this.rnboService.isDeviceLoaded.subscribe((deviceLoaded: boolean) => {
        console.log(`device loaded: ${deviceLoaded}`);
        this.cdRef.detectChanges();
    });
}
ngAfterViewInit() {
  console.log(`device ui after view init`);
  this.rnboService.createUIElements();
}
}
