import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDeviceUiComponent } from './custom-device-ui.component';

describe('CustomDeviceUiComponent', () => {
  let component: CustomDeviceUiComponent;
  let fixture: ComponentFixture<CustomDeviceUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomDeviceUiComponent]
    });
    fixture = TestBed.createComponent(CustomDeviceUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
