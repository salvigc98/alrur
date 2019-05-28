import { TestBed } from '@angular/core/testing';

import { RegistrarViajeroService } from './registrar-viajero.service';

describe('RegistrarViajeroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrarViajeroService = TestBed.get(RegistrarViajeroService);
    expect(service).toBeTruthy();
  });
});
