import { TestBed } from '@angular/core/testing';

import { ListarAlojamientosService } from './listar-alojamientos.service';

describe('ListarAlojamientosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListarAlojamientosService = TestBed.get(ListarAlojamientosService);
    expect(service).toBeTruthy();
  });
});
