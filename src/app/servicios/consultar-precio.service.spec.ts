import { TestBed } from '@angular/core/testing';

import { ConsultarPrecioService } from './consultar-precio.service';

describe('ConsultarPrecioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultarPrecioService = TestBed.get(ConsultarPrecioService);
    expect(service).toBeTruthy();
  });
});
