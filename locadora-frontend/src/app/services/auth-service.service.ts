// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // Altere para sua URL de API

  constructor(private http: HttpClient) {}

  login(data: any, isFuncionario: boolean): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/${isFuncionario ? 'funcionario' : 'cliente'}`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, data);
  }
}
