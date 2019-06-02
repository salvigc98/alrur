import { TestBed } from '@angular/core/testing';

import { AnadirAlojamientoService } from './anadir-alojamiento.service';

describe('AnadirAlojamientoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnadirAlojamientoService = TestBed.get(AnadirAlojamientoService);
    expect(service).toBeTruthy();
  });
});
