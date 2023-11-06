import { Component, ElementRef, ViewChild } from '@angular/core';
import * as Nexus from 'nexusui';
import { RnboService } from 'src/app/services/rnbo/rnbo.service';
@Component({
  selector: 'app-custom-device-ui',
  templateUrl: './custom-device-ui.component.html',
  styleUrls: ['./custom-device-ui.component.css']
})
export class CustomDeviceUiComponent {
  piano: any;
  activeToggle: any;
  active!: boolean;
  displayOctaves!: number;
  activeRegion!: number;
  activeVelocity!: number;
  notesHeld: Set<number> = new Set([]);
  keyMap = 'AWSEDFTGYHUJKL';
  keyUpListener: any;
  keyDownListener: any;
  constructor(public rnboService: RnboService) { }
  ngOnInit() {
    this.octavesDisplayed = 3;
    this.createPiano();
    this.createActiveToggle();
  }
  ngOnDestroy() {
    this.piano.destroy();
  }
  createActiveToggle() {
    this.activeToggle = new Nexus.Toggle('#activeToggle', {
      state: true,
      size: [75, 25]
    });
    this.activeToggle.on('change', (v: boolean) => {
      this.active = v;

      if(v) {
        this.keyUpListener = document.addEventListener('keyup', (e: KeyboardEvent) => this.onRelease(e));
        this.keyDownListener = document.addEventListener('keydown', (e: KeyboardEvent) => this.onPress(e)); 
      }
      else {
        document.removeEventListener('keydown', this.keyDownListener);
        document.removeEventListener('keyup', this.keyUpListener);
      }
      console.log(`toggle changed to ${v ? 'on' : 'off'}`);
    });
  }
    createPiano() {
      if (this.piano) {
        this.piano.destroy();
      }
      this.activeRegion = 0;
      this.activeVelocity = 64;
      this.notesHeld.clear();
      this.piano = new Nexus.Piano('#midikeyboard', {
        'size': [500, 125],
        'mode': 'toggle',
        'lowNote': 24,
        'highNote': this.displayOctaves *  + 24
      });
  
      this.piano.on('change', ({note, state}: {note: number, state: boolean}) => {
        if(state) {
          this.notesHeld.add(note);
        }
        else {
          this.notesHeld.delete(note);
        }

        console.log(`playing notes: ${[...this.notesHeld]}`);
          //this.rnboService.emitSyncEvent('message', ['chordin', ...this.notesHeld]);
      });
    }
    set octavesDisplayed(n: number) {
      this.displayOctaves = Math.min(Math.max(n, 1), 8);
    }
    set velocity(arrow: 'Up' | 'Down' | 'Right' | 'Left') {
      switch (arrow) {
        case 'Up':
          this.activeVelocity++;
          break;
        case 'Down':
          this.activeVelocity--;
          break;
        case 'Right':
          this.activeVelocity += 10;
          break;
        case 'Left':
          this.activeVelocity -= 10;
          break;
      }
    }
    set region(numKey: number) {
      // turn 0 into 10, 0...9 into [0., 0.9], and [0., 0.9] into 0...displayOctaves
      this.activeRegion = Math.floor(((numKey + 9) % 10) / 10 * this.displayOctaves);
      
      console.log(`activeRegion: ${this.activeRegion}`);
    }
    midiFromIndex(keyIndex: number) {
      return keyIndex + this.activeRegion * 12;
    }
    onPress(e: KeyboardEvent) {
      if (!this.active) {
        return;
      }
      if (e.code.startsWith('Key')) {
        this.playNote(e.code, true);
      }
      if (e.code.startsWith('Arrow')) {
        this.velocity = e.code.slice(5) as 'Up' | 'Down' | 'Right' | 'Left';
    }
  }
    onRelease(e: KeyboardEvent) {

      if (!this.active) {
        return;
      }
      if (e.code.startsWith('Digit')) {
        this.region = +e.key;
      }
      else if (e.code.startsWith('Key')) {
        this.playNote(e.code, false);
      }
      else {
        this.keyCommand(e.code as 'Backspace' | 'Space' | 'Delete' | 'Enter')
      }
    }
    playNote(keycode: string, state: boolean) {
      let index = this.keyMap.indexOf(keycode[3]);
      if(index<0) {
        return;
      }
      let midiValue = this.midiFromIndex(index);
      index += this.activeRegion*12;
      if((!this.notesHeld.has(midiValue))&&state) {
        this.piano.toggleIndex(index, true);
        this.notesHeld.add(midiValue);
        console.log(`note on: key=${keycode[3]}, index=${index}, midi=${midiValue}`);
      }
      else if ((this.notesHeld.has(midiValue))&&!state) {
        this.piano.toggleIndex(index, false);
        this.notesHeld.delete(midiValue);
        console.log(`note off: key=${keycode[3]}, index=${index}, midi=${midiValue}`);
      }
      else {
        return;
      }
    }
    keyCommand(cmd: 'Backspace' | 'Space' | 'Delete' | 'Enter') {
      switch(cmd) {
        case 'Backspace':
          this.clearAll();
          break;
        case 'Space':
          break;
        case 'Delete':
          break;
        case 'Enter':
          break;
      }
  
    }
    clearAll() {
      this.notesHeld.forEach(n => this.piano.toggleKey(n, false))
      this.notesHeld.clear();
    }
  }
