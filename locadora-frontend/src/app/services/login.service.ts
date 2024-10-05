// src/app/services/login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/auth'; // URL do seu backend

  constructor(private http: HttpClient) {}

  // Método para registrar um usuário
  register(nome: string, email: string, senha: string, isFuncionario: boolean): Observable<any> {
    const user = { nome, email, senha }; // Incluí o nome
    return this.http.post(`${this.apiUrl}/registrar-${isFuncionario ? 'funcionario' : 'cliente'}`, user);
  }

  // Método para logar um usuário
  login(email: string, senha: string, isFuncionario: boolean): Observable<any> {
    const user = { email, senha };
    return this.http.post(`${this.apiUrl}/login/${isFuncionario ? 'funcionario' : 'cliente'}`, user);
  }
}
