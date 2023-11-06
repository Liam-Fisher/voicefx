import { Component, ElementRef, ViewChild } from '@angular/core';

import { RnboService } from 'src/app/services/rnbo/rnbo.service';

 @Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css'],
})
export class MessageInputComponent {
  defaultText = '----select an input----';
  type?: string;
  target: string = '';
  
  data: number[] = [];
  @ViewChild('target') select!: ElementRef<HTMLSelectElement>;
  @ViewChild('message') element!: ElementRef<HTMLInputElement>;

  constructor(public rnboService: RnboService) {}
  ngOnInit() {
    this.rnboService.activeTargetInput.subscribe(([target, ...data]: [string, ...number[]]) => {
      console.log(`active target input: ${target} ${data}`);
      if(target && data.length) {
        this.select.nativeElement.value = target;
        this.target = target;
        this.element.nativeElement.value = data.join(' ');
        this.data = data;
      }
  });
  }
  setTarget(evt: any) {
    let v = evt.target.value as string;
    if (v !== this.defaultText) {
      this.target = v;
    }
    console.log(`set input to ${this.target}`);
  }
  setData(evt: any) {
    console.log('set data event');
    this.data = this.parseEvent(evt);
  }
  sendMessage() {
    
    if (this.target === '----select an input----' || !this.data.length) {
      return;
    } 
    this.rnboService.emitSyncEvent('message', [this.target, this.data])

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
 