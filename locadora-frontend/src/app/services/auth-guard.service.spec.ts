import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth-guard.service';
import { Router } from '@angular/router';
import { AuthService } from './auth-service.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  let authService: AuthService;

  beforeEach(() => {
    const routerStub = {
      navigate: jasmine.createSpy('navigate')
    };

    const authServiceStub = {
      isLoggedIn: () => true, // Mude conforme necessário
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerStub },
        { provide: AuthService, useValue: authServiceStub },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
