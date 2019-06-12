import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarAlojamientoComponent } from './eliminar-alojamiento.component';

describe('EliminarAlojamientoComponent', () => {
  let component: EliminarAlojamientoComponent;
  let fixture: ComponentFixture<EliminarAlojamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarAlojamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarAlojamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
