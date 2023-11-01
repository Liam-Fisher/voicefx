import { ChangeDetectorRef, Component } from '@angular/core';
import { RnboService } from 'src/app/services/rnbo.service';
@Component({
  selector: 'app-device-ui',
  templateUrl: './device-ui.component.html',
  styleUrls: ['./device-ui.component.css']
})
export class DeviceUI {
    constructor(
        public rnboService: RnboService,
        public cdRef: ChangeDetectorRef
        ) {
     }
    ngOnInit() {
        console.log(`initialized device ui`);
    }
    ngAfterViewInit(): void {
        console.log(`creating device uis`);
        this.rnboService.uiElements.forEach(ui => ui.createElement());
        this.cdRef.detectChanges();
    }
}
