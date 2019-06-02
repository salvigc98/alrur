import { TestBed } from '@angular/core/testing';

import { EliminarAlojamientoService } from './eliminar-alojamiento.service';

describe('EliminarAlojamientoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EliminarAlojamientoService = TestBed.get(EliminarAlojamientoService);
    expect(service).toBeTruthy();
  });
});
