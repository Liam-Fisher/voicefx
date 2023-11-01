import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumParameterUiComponent } from './enum-parameter-ui.component';

describe('EnumParameterUiComponent', () => {
  let component: EnumParameterUiComponent;
  let fixture: ComponentFixture<EnumParameterUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnumParameterUiComponent]
    });
    fixture = TestBed.createComponent(EnumParameterUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
