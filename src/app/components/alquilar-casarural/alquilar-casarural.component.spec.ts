import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlquilarCasaruralComponent } from './alquilar-casarural.component';

describe('AlquilarCasaruralComponent', () => {
  let component: AlquilarCasaruralComponent;
  let fixture: ComponentFixture<AlquilarCasaruralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlquilarCasaruralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlquilarCasaruralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
