import * as Nexus from 'nexusui';
import { CustomRNBOInputMetadata } from "../../types/dataTypes";
import { BaseDevice } from '@rnbo/js';
import { ListInportUI } from '../core';

export default class PianoUI extends ListInportUI<'kslider'> {
    lowNote: number;
    highNote: number;
    isPolyphonic: boolean;
    activeKeys: Set<number> = new Set();
    mode?: 'lead'|'chord'|'touch';
    inputElement!: any;
    constructor(override meta: CustomRNBOInputMetadata<'List', 'kslider'>,  tag: string, device: BaseDevice) {
            super(meta, tag, device);
            this.sendOnChange = this.meta.sendOnChange ?? false;
            this.lowNote = this.meta?.offset ?? 36;
            this.highNote = (this.meta?.range ?? 36) + (this.meta?.offset ?? this.lowNote);
            this.isPolyphonic = !!this.meta?.isPolyphonic ?? false;
            console.log(`send mode: ${this.isPolyphonic}`);
}
  createElement() {
    let mode = this.meta?.mode===2 ? 'button' : 'toggle';
    let {size, highNote, lowNote} = this;
    this.element =  Nexus.Add.Piano(this.elementId, { size, mode, lowNote, highNote} );
    this.inputElement = Nexus.Add.TextButton(this.elementId, {
      'size': [this.size[0], 20],
      'text': 'Play Chord'
    });
    
    this.inputElement.on('change', (v: any) => {
      console.log(v);
      if(v) { 
        this.element.emit('send');
      }
    });
  }
  resetData() {
    if(!this.sendOnChange) {
      this.activeKeys.forEach(k => this.element.toggleKey(k ,false));
      this.activeKeys.clear();
    }
  }
  playChordByKey(notes: number[]) {
    if(!notes.length) {
      return;
    }
    this.sendOnChange = false;
    this.activeKeys.forEach(k => this.element.toggleKey(k ,false));
    notes.forEach(note => this.element.toggleIndex(note, true));
    this.element.emit('send');
    this.sendOnChange = true;
  }
  // playChordByIndex
  parseEvent({note, state}: {note:number, state: boolean}): number[] {
   
  if(state) {
    this.activeKeys.add(note);
  }
  else {
    this.activeKeys.delete(note);
  }
  return [...this.activeKeys];
  }
} 