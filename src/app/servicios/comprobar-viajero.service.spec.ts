import { TestBed } from '@angular/core/testing';

import { ComprobarViajeroService } from './comprobar-viajero.service';

describe('ComprobarViajeroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComprobarViajeroService = TestBed.get(ComprobarViajeroService);
    expect(service).toBeTruthy();
  });
});
