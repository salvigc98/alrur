import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPropietarioComponent } from './login-propietario.component';

describe('LoginPropietarioComponent', () => {
  let component: LoginPropietarioComponent;
  let fixture: ComponentFixture<LoginPropietarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPropietarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
