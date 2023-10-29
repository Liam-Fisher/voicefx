import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PianoUiComponent } from './piano-ui.component';

describe('PianoUiComponent', () => {
  let component: PianoUiComponent;
  let fixture: ComponentFixture<PianoUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PianoUiComponent]
    });
    fixture = TestBed.createComponent(PianoUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
