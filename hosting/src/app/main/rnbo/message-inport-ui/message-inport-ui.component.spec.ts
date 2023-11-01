import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageInportUiComponent } from './message-inport-ui.component';

describe('MessageInportUiComponent', () => {
  let component: MessageInportUiComponent;
  let fixture: ComponentFixture<MessageInportUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageInportUiComponent]
    });
    fixture = TestBed.createComponent(MessageInportUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
