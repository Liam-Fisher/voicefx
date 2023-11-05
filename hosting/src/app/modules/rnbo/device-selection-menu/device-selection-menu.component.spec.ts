import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSelectionMenuComponent } from './device-selection-menu.component';

describe('DeviceSelectionMenuComponent', () => {
  let component: DeviceSelectionMenuComponent;
  let fixture: ComponentFixture<DeviceSelectionMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceSelectionMenuComponent]
    });
    fixture = TestBed.createComponent(DeviceSelectionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
