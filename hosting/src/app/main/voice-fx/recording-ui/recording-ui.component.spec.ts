import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingUIComponent } from './recording-ui.component';

describe('RecordingComponent', () => {
  let component: RecordingUIComponent;
  let fixture: ComponentFixture<RecordingUIComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordingUIComponent]
    });
    fixture = TestBed.createComponent(RecordingUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
