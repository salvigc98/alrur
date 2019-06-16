import { TestBed } from '@angular/core/testing';

import { PublicarComentarioService } from './publicar-comentario.service';

describe('PublicarComentarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublicarComentarioService = TestBed.get(PublicarComentarioService);
    expect(service).toBeTruthy();
  });
});
