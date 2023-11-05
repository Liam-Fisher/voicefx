import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetUiComponent } from './preset-ui.component';

describe('PresetUiComponent', () => {
  let component: PresetUiComponent;
  let fixture: ComponentFixture<PresetUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresetUiComponent]
    });
    fixture = TestBed.createComponent(PresetUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
