import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioOptionsComponent } from './audio-options.component';

describe('AudioOptionsComponent', () => {
  let component: AudioOptionsComponent;
  let fixture: ComponentFixture<AudioOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AudioOptionsComponent]
    });
    fixture = TestBed.createComponent(AudioOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
