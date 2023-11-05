
import { ChangeDetectorRef, Component } from '@angular/core';
import { RnboService } from 'src/app/services/rnbo/rnbo.service';
@Component({
  selector: 'app-rnbo-device',
  templateUrl: './rnbo-device.component.html',
  styleUrls: ['./rnbo-device.component.css']
})
export class RnboDeviceComponent {
  createUIElements = false;
  constructor(
      public rnboService: RnboService,
      public cdRef: ChangeDetectorRef
      ) {
   }
  ngOnInit() {
      console.log(`initialized device ui`);
      this.rnboService.isDeviceLoaded.subscribe((deviceLoaded: boolean) => {
          console.log(`device loaded: ${deviceLoaded}`);
          this.rnboService.isTouchDevice.next('ontouchstart' in window || navigator.maxTouchPoints > 0);
          this.cdRef.detectChanges();
      });
      
  }
}