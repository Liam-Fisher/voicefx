import { Component } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { RnboService } from 'src/app/services/rnbo/rnbo.service';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';

@Component({
  selector: 'app-text-input',
  /* 
  has language input
  templateUrl: './text-input.component.html', */
  template: `
  <div id="text-input"> 
<div [ngClass]="this.textData.errors?.['maxlength'] ? 'alert info' : 'info' ">Input text cannot be more than 64 characters.</div> 
<input 
  type="text"
  class="text-input"
  placeholder="Say something..."
  [formControl]="textData"
  />
  <button id="sendButton" (click)="onSubmit()">Send</button>  
</div>
  `,
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent {
  textData!: FormControl<string|null>;
  language: string = navigator.language;

  /* ttsForm!: FormGroup<{
    textInput: FormControl<string|null>,
    language: FormControl<string|null>
  }>;   */
  constructor(private rnboService: RnboService, private textToSpeechService: TextToSpeechService/* , private fb: FormBuilder */) { }
  ngOnInit() {
    console.log(navigator.language);
    this.textData = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(64)
    ]);
  }
  get text() {
    return this.textData.getRawValue()
  }
  onSubmit() {
    console.log(`form submitted`);
    this.textToSpeechService.speak(this.text,  this.language).then((filename: string) => {
      this.rnboService.audioForFile(filename);
    }); 
  }
}
