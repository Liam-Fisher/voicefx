import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceFxPageComponent } from './voice-fx-page.component';

describe('VoiceFxPageComponent', () => {
  let component: VoiceFxPageComponent;
  let fixture: ComponentFixture<VoiceFxPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoiceFxPageComponent]
    });
    fixture = TestBed.createComponent(VoiceFxPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
