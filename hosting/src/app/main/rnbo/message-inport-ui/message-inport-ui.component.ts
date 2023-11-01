import { Component, ElementRef, ViewChild } from '@angular/core';
import { RnboService } from 'src/app/services/rnbo.service';
@Component({
  selector: 'app-message-inport-ui',
  templateUrl: './message-inport-ui.component.html',
  styleUrls: ['./message-inport-ui.component.css'],
})
export class MessageInportUIComponent {
  defaultText = '----select an inport----';
  tag: string = '';
  @ViewChild('message') element!: ElementRef<HTMLInputElement>;

  data: number[] = [];
  constructor(public rnboService: RnboService) {}

  ngAfterViewInit(): void {}
  sendMsg(evt: any) {
    if (!this.tag) {
      return;
    }
    this.data = this.parseEvent(evt);
    if (!this.data.length) {
      return;
    }
    this.rnboService.emitSyncEvent('message', [this.tag, this.data]);
  }
  setInport(evt: any) {
    let v = evt.target.value as string;
    if (v !== this.defaultText) {
      this.tag = v;
    }
  }
  parseEvent(evt: any): number[] {
    let str = evt.target.value as string;
    let arr = str.split(' ').map((x) => parseInt(x));
    if (arr.every((x) => !isNaN(x))) {
      return arr;
    }
    return [];
  }
}
