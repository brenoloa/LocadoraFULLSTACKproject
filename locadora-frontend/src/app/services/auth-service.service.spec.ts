// src/app/services/auth.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth-service.service'; // Corrigido para importar AuthService

describe('AuthService', () => { // Alterado para AuthService
  let service: AuthService; // Alterado para AuthService

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService); // Alterado para AuthService
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
