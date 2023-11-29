import { Component, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RnboService } from 'src/app/services/rnbo/rnbo.service';

@Component({
  selector: 'app-effect-select-ui',
  templateUrl: './effect-select-ui.component.html',
  styleUrls: ['./effect-select-ui.component.css']
})
export class EffectSelectUiComponent {
  currentSelection = new BehaviorSubject<string>('robot');
  readonly effects = [
    {
      "title": "robot",
      "id": "robot",
      "preset": "robot",
      "emoji": "🤖",
      "folder": "voice-fx"
    },
    {
      "title": "squirrel",
      "id": "squirrel",
      "preset": "squirrel",
      "emoji": "🐿",
      "folder": "voice-fx"
    },
    {
      "title": "monster",
      "id": "monster",
      "preset": "monster",
      "emoji": "🧟‍♂️",
      "folder": "voice-fx"
    },
    
    {
      "title": "loop",
      "id": "loop",
      "emoji": "?",
      "folder": "voice-fx"
    }
    /* ,
    {
      "title": "alien",
      "id": "alien",
      "preset": "alien",
      "emoji": "👽"
    } */
  ];
  constructor(public rnboService: RnboService) { }
  
  selectEffect(id: string) {

    console.log(`selected device ${id}`);
    this.rnboService.loadDevice({id, folder: 'voice-fx'}).then(() => {
      this.currentSelection.next(id);
    });
  }
}
