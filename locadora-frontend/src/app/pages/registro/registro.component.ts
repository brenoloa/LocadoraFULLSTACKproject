// src/app/pages/registro/registro.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nome: string = ''; // Adicionamos o campo nome
  email: string = '';
  senha: string = '';
  isFuncionario: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  onRegister() {
    console.log('Iniciando registro com:', { nome: this.nome, email: this.email, senha: this.senha, isFuncionario: this.isFuncionario });
    this.loginService.register(this.nome, this.email, this.senha, this.isFuncionario).subscribe(
      response => {
        console.log('Registro realizado com sucesso!', response);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Erro ao registrar', error);
      }
    );
  }
}
