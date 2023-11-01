import * as Nexus from 'nexusui';
import {rgbToHex} from '../helpers/styling';
import { CustomRNBOMetadata } from "../dataTypes";
import { ListInportUI } from './core';
import { BaseDevice } from '@rnbo/js';

export default class PianoUI extends ListInportUI<'kslider'> {
    lowNote: number;
    highNote: number;
    isPolyphonic: boolean;
    activeKeys: Set<number> = new Set();
    constructor(override meta: CustomRNBOMetadata<'List', 'kslider'>,  tag: string, device: BaseDevice) {
            super(meta, tag, device);
            this.lowNote = this.meta?.offset ?? 36;
            this.highNote = (this.meta?.range ?? 36) + (this.meta?.offset ?? this.lowNote);
            this.isPolyphonic = !!this.meta?.mode ?? true;

}
  createElement() {
    let mode = this.meta?.mode===2 ? 'button' : 'toggle';
    let {size, highNote, lowNote} = this;
    this.element =  new Nexus.Piano(this.elementId, { size, mode, lowNote, highNote} );
    if(this.meta?.hkeycolor) {
      this.element.colorize('accent', rgbToHex(this.meta.hkeycolor))
    };
    if(this.meta?.whitekeycolor) {
      this.element.colorize('fill', rgbToHex(this.meta.whitekeycolor))
    };
    if(this.meta?.blackkeycolor) {
      this.element.colorize('dark', rgbToHex(this.meta.blackkeycolor))
  };
    this.linkElementToInport();
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
    if(!this.isPolyphonic) {
        this.activeKeys.clear();
    }
    state ? this.activeKeys.add(note) :this.activeKeys.delete(note);
    return [...this.activeKeys];
  }
} 