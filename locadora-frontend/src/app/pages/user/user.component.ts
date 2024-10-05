import { Component, OnInit } from '@angular/core';
import { CarroService } from '../../services/carro.service';
import { LocacaoService } from '../../services/locacao.service';
import { NotificacaoService } from '../../services/notificacao.service';
import { Carro } from '../../models/carro.model';
import { Locacao } from '../../models/locacao.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  carros: Carro[] = [];
  carroSelecionado: Carro | null = null;
  quantidadeDias: number | null = null;
  total: number | null = null;
  locacaoAtual: Locacao | null = null;

  constructor(
    private carroService: CarroService,
    private locacaoService: LocacaoService,
    private notificacaoService: NotificacaoService
  ) {}

  ngOnInit(): void {
    this.carroService.listarCarrosDisponiveis().subscribe(
      (data: Carro[]) => {
        this.carros = data;
      },
      (error) => {
        console.error('Erro ao listar carros disponíveis:', error);
      }
    );

    // Verificar se há uma locação em andamento no sessionStorage
    const locacaoArmazenada = sessionStorage.getItem('locacaoAtual');
    if (locacaoArmazenada) {
      this.locacaoAtual = JSON.parse(locacaoArmazenada);
    }
  }

  selecionarCarro(carro: Carro): void {
    this.carroSelecionado = carro;
    this.quantidadeDias = null;
    this.total = null;
  }

  calcularTotal(): void {
    if (this.quantidadeDias && this.carroSelecionado) {
      this.total = this.quantidadeDias * this.carroSelecionado.precoPorDia;
    }
  }

  solicitarAluguel(): void {
    if (this.carroSelecionado && this.quantidadeDias) {
      const locacao: Locacao = {
        id: 0, // O ID será gerado pelo backend
        carroId: this.carroSelecionado.id,
        clienteNome: 'Nome do Cliente', // Substitua pelo nome do cliente logado
        dataLocacao: new Date(),
        dataDevolucao: new Date(new Date().setDate(new Date().getDate() + this.quantidadeDias)),
        aprovado: false
      };

      this.locacaoService.registrarSolicitacao(locacao);
      this.notificacaoService.enviarNotificacao(locacao);
      alert('Solicitação de locação enviada com sucesso!');
    } else {
      alert('Preencha todas as informações antes de solicitar.');
    }
  }

  devolverCarro(): void {
    if (this.locacaoAtual) {
      this.locacaoService.recusarLocacao(this.locacaoAtual.id).subscribe(
        () => {
          const carroId = this.locacaoAtual.carroId;
          alert(`Carro ID: ${carroId} devolvido com sucesso!`);

          // Atualizar a disponibilidade do carro
          this.carroService.atualizarDisponibilidade(carroId, true).subscribe({
            next: () => {
              console.log('Disponibilidade do carro atualizada.');
            },
            error: (error) => {
              console.error('Erro ao atualizar disponibilidade do carro:', error);
            }
          });

          this.locacaoAtual = null;
          sessionStorage.removeItem('locacaoAtual');
        },
        (error) => {
          console.error('Erro ao devolver carro:', error);
        }
      );
    } else {
      alert('Nenhuma locação atual para devolver.');
    }
  }
}
