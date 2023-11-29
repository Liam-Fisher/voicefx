import { Component,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-language-input',
  templateUrl: './language-input.component.html',
  styleUrls: ['./language-input.component.css']
})
export class LanguageInputComponent {
  @ViewChild('languageMenu', { static: false }) languageInput!: ElementRef<HTMLSelectElement>;
    constructor() {
        
    }
    ngAfterViewInit() {
      console.log(`language input initialized ${navigator.language}`);
      this.languageInput.nativeElement.value = navigator.language;
    }
}
