import { TestBed } from '@angular/core/testing';

import { ConsultarDisponibilidadService } from './consultar-disponibilidad.service';

describe('ConsultarDisponibilidadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultarDisponibilidadService = TestBed.get(ConsultarDisponibilidadService);
    expect(service).toBeTruthy();
  });
});
