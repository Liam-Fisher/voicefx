import * as Nexus from 'nexusui';
import { CustomRNBOInputMetadata } from "../../types/dataTypes";
import { BaseDevice } from '@rnbo/js';
import { ListInportUI } from '../core';

export default class PianoUI extends ListInportUI<'kslider'> {
    lowNote: number;
    highNote: number;
    isPolyphonic: boolean;
    activeKeys: Set<number> = new Set();
    mode?: 'lead'|'chord'|'touch'
    constructor(override meta: CustomRNBOInputMetadata<'List', 'kslider'>,  tag: string, device: BaseDevice) {
            super(meta, tag, device);
            this.sendOnChange = this.meta.sendOnChange ?? true;
            this.lowNote = this.meta?.offset ?? 36;
            this.highNote = (this.meta?.range ?? 36) + (this.meta?.offset ?? this.lowNote);
            this.isPolyphonic = !!this.meta?.isPolyphonic ?? true;
            console.log(`send mode: ${this.isPolyphonic}`);

}
  createElement() {
    let mode = this.meta?.mode===2 ? 'button' : 'toggle';
    let {size, highNote, lowNote} = this;
    this.element =  new Nexus.Piano(this.elementId, { size, mode, lowNote, highNote} );
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
    console.log(`received notein event`, {note, state});
    if(!this.sendOnChange) {
        this.activeKeys.clear();
    }
    state ? this.activeKeys.add(note) :this.activeKeys.delete(note);
    return [...this.activeKeys];
  }
} 