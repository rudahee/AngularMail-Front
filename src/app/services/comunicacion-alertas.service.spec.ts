import { TestBed } from '@angular/core/testing';

import { ComunicacionAlertasService } from './comunicacion-alertas.service';

describe('ComunicacionAlertasService', () => {
  let service: ComunicacionAlertasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunicacionAlertasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
