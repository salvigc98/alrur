import { TestBed } from '@angular/core/testing';

import { AlquilarCasaService } from './alquilar-casa.service';

describe('AlquilarCasaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlquilarCasaService = TestBed.get(AlquilarCasaService);
    expect(service).toBeTruthy();
  });
});
