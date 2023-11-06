import { Component } from '@angular/core';
import { RnboService } from 'src/app/services/rnbo/rnbo.service';
import testStyle  from './testStyle'; 
@Component({
  selector: 'app-device-ui',
  templateUrl: './device-ui.component.html',
  styleUrls: ['./device-ui.component.css']
})
export class DeviceUiComponent {
constructor(public rnboService: RnboService) { }
ngOnInit() { 
  
}


ngAfterViewInit(): void {
 console.log(`device ui after view init`);
  this.rnboService.createUIElements();
  
}
}
