import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberParameterUiComponent } from './number-parameter-ui.component';

describe('NumberParameterUiComponent', () => {
  let component: NumberParameterUiComponent;
  let fixture: ComponentFixture<NumberParameterUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberParameterUiComponent]
    });
    fixture = TestBed.createComponent(NumberParameterUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
