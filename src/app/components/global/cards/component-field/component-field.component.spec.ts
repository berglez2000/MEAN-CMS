import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentFieldComponent } from './component-field.component';

describe('ComponentFieldComponent', () => {
  let component: ComponentFieldComponent;
  let fixture: ComponentFixture<ComponentFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
