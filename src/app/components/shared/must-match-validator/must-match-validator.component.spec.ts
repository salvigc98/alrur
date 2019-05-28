import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MustMatchValidatorComponent } from './must-match-validator.component';

describe('MustMatchValidatorComponent', () => {
  let component: MustMatchValidatorComponent;
  let fixture: ComponentFixture<MustMatchValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MustMatchValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MustMatchValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
