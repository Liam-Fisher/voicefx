import { Component, ElementRef, ViewChild } from '@angular/core';
import { RnboService } from 'src/app/services/rnbo/rnbo.service';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css'],
})
export class MessageInputComponent {
  defaultText = '----select an input----';
  tag: string = '';
  @ViewChild('message') element!: ElementRef<HTMLInputElement>;

  data: number[] = [];
  constructor(public rnboService: RnboService) {}
  ngAfterViewInit(): void {
    this.setText('testinggggg')
  }
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
  setText(text: string) {
    this.element.nativeElement.value = text;
  }
  
}
