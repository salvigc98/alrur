import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirAlojamientoComponent } from './anadir-alojamiento.component';

describe('AnadirAlojamientoComponent', () => {
  let component: AnadirAlojamientoComponent;
  let fixture: ComponentFixture<AnadirAlojamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnadirAlojamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnadirAlojamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
