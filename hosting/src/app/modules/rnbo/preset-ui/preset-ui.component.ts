import { Component, ElementRef, ViewChild } from '@angular/core';
import { RnboService } from 'src/app/services/rnbo/rnbo.service';

@Component({
  selector: 'app-preset-ui',
  templateUrl: './preset-ui.component.html',
  styleUrls: ['./preset-ui.component.css']
})
export class PresetUiComponent {
  readonly presetEmojis = {

  
  };
constructor(public rnboService: RnboService) { }
  ngOnInit() {
  };
  ngAfterViewInit(): void {
    
  
  };
  setPreset(event: any) {
    let presetName = event.target.value;
    console.log(`set preset to ${presetName}`);
    this.rnboService.device.setPreset(presetName);
  }
}
