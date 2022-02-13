import { TestBed } from '@angular/core/testing';

import { Cliente.ServiceService } from './cliente.service.service';

describe('Cliente.ServiceService', () => {
  let service: Cliente.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cliente.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
