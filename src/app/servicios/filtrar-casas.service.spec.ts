import { TestBed } from '@angular/core/testing';

import { FiltrarCasasService } from './filtrar-casas.service';

describe('FiltrarCasasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FiltrarCasasService = TestBed.get(FiltrarCasasService);
    expect(service).toBeTruthy();
  });
});
