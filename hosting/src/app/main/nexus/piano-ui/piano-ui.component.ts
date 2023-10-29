import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as Nexus from 'nexusui';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-piano-ui',
  templateUrl: './piano-ui.component.html',
  template: `
  <div #piano></div>
  `,
  styles: []
})
export class PianoUiComponent {
  // FOr responsive Layouts
  //@Input() rect!: [number, number, number, number];
  //@Input() container_size = new BehaviorSubject<[number, number]>([100, 100]);
  @Input() size!: [number, number];
  @Input() mode = new BehaviorSubject<'button'|'toggle'|'impulse'>('button');
  @Input() lowNote!: number;
  @Input() highNote!: number;
  @Output() valueChange = new EventEmitter<number>();
  constructor() { }
ngOnInit() {

var piano = new Nexus.Piano('#piano', {
  'size': this.size,
  'mode': this.mode.value,
  'lowNote': this.lowNote,
  'highNote': this.highNote
});
piano.on('change', (v: any) => {
  console.log('changed pinao');
  console.log(v);
  this.valueChange.emit(v);
});
}


}
