import { ChangeDetectorRef, Component } from '@angular/core';
import { RnboService } from 'src/app/services/rnbo/rnbo.service';

@Component({
  selector: 'app-monster-device',
  templateUrl: './monster-device.component.html',
  styleUrls: ['./monster-device.component.css']
})
export class MonsterDeviceComponent {
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
