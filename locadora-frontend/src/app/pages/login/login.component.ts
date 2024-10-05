// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = ''; // Bind com o ngModel no template
  senha: string = ''; // Bind com o ngModel no template
  isFuncionario: boolean = false; // Bind com o ngModel no template

  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    console.log('Iniciando login com:', { email: this.email, senha: this.senha, isFuncionario: this.isFuncionario });
    this.loginService.login(this.email, this.senha, this.isFuncionario)
      .subscribe(
        (response) => {
          console.log('Login bem-sucedido, resposta do backend:', response);
          if (response.token) {
            localStorage.setItem('token', response.token);
            // Armazenar o valor de isFuncionario no localStorage
            localStorage.setItem('isFuncionario', JSON.stringify(this.isFuncionario));
            console.log('Token armazenado no localStorage:', response.token); // Verificação
            if (this.isFuncionario) {
              this.router.navigate(['/staff']);
            } else {
              this.router.navigate(['/user']);
            }
          } else {
            console.error('Token não encontrado na resposta.');
          }
        },
        (error) => {
          console.error('Erro ao fazer login', error);
        }
      );
  }
}
