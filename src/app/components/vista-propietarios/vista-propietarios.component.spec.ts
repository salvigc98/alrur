import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPropietariosComponent } from './vista-propietarios.component';

describe('VistaPropietariosComponent', () => {
  let component: VistaPropietariosComponent;
  let fixture: ComponentFixture<VistaPropietariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaPropietariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaPropietariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
