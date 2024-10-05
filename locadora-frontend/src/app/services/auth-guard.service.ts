// src/app/services/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth-service.service';;
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');
    const isFuncionario = JSON.parse(localStorage.getItem('isFuncionario') || 'false'); // Obtenha o valor corretamente

    // Verifica se o token existe
    if (token) {
      // Redirecionar dependendo do tipo de usuário
      if (route.routeConfig?.path === 'staff' && !isFuncionario) {
        this.router.navigate(['/user']); // Redirecionar cliente para a página de usuário
        return false;
      }
      if (route.routeConfig?.path === 'user' && isFuncionario) {
        this.router.navigate(['/staff']); // Redirecionar funcionário para a página de funcionário
        return false;
      }
      return true; // Permitir acesso à rota
    } else {
      this.router.navigate(['/login']); // Redirecionar para a página de login se não estiver autenticado
      return false; // Bloquear acesso à rota
    }
  }
}
