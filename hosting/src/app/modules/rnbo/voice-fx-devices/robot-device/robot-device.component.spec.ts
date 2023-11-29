import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotDeviceComponent } from './robot-device.component';

describe('RobotDeviceComponent', () => {
  let component: RobotDeviceComponent;
  let fixture: ComponentFixture<RobotDeviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RobotDeviceComponent]
    });
    fixture = TestBed.createComponent(RobotDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
