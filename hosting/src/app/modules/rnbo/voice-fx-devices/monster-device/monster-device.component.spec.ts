import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterDeviceComponent } from './monster-device.component';

describe('MonsterDeviceComponent', () => {
  let component: MonsterDeviceComponent;
  let fixture: ComponentFixture<MonsterDeviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonsterDeviceComponent]
    });
    fixture = TestBed.createComponent(MonsterDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
