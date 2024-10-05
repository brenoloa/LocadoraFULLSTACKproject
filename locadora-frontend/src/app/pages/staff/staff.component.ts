import { Component, OnInit, ViewChild } from '@angular/core';
import { CarroService } from '../../services/carro.service';
import { LocacaoService } from '../../services/locacao.service';
import { WebSocketService } from '../../services/websocket.service'; // Serviço WebSocket
import { Carro } from '../../models/carro.model';
import { Locacao } from '../../models/locacao.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListaCarrosModule } from '../lista-carros/lista-carros.module';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, FormsModule, ListaCarrosModule],
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  novoCarro: Carro = {
    id: 0,
    marca: '',
    modelo: '',
    ano: 0,
    cor: '',
    km: 0,
    precoPorDia: 0,
    disponivel: true
  };

  carroParaEditar: Carro | null = null;
  locacoesPendentes: Locacao[] = [];
  locacaoSolicitada: Locacao | null = null;

  @ViewChild('listaCarros') listaCarrosComponent: any;

  constructor(
    private carroService: CarroService,
    private locacaoService: LocacaoService,
    private websocketService: WebSocketService, // Serviço WebSocket
    private router: Router
  ) {}

  ngOnInit() {
    this.atualizarLocacoesPendentes();

    // Assinar as notificações de WebSocket
    this.websocketService.connectToLocacaoNotifications().subscribe((mensagem: string) => {
      alert('Nova locação recebida: ' + mensagem); // Exibir a notificação da nova locação
      this.atualizarLocacoesPendentes(); // Atualizar a lista de locações pendentes
    });

    // Assinar as notificações de locação criadas localmente
    this.locacaoService.locacao$.subscribe(locacao => {
      if (locacao) {
        this.locacaoSolicitada = locacao; // Exibir notificação para a locação solicitada
        if (confirm(`Nova solicitação de locação para o carro ID: ${locacao.carroId}. Deseja aprovar?`)) {
          this.aprovarLocacao(locacao);
        } else {
          this.recusarLocacao(locacao);
        }
      }
    });
  }

  atualizarLocacoesPendentes() {
    this.locacaoService.listarLocacoes().subscribe(
      locacoes => {
        this.locacoesPendentes = locacoes.filter(locacao => !locacao.aprovado);
      },
      error => {
        console.error('Erro ao carregar locações:', error);
      }
    );
  }

  adicionarCarro(): void {
    this.carroService.adicionarCarro(this.novoCarro).subscribe({
      next: (response) => {
        console.log('Carro adicionado:', response);
        this.novoCarro = { id: 0, marca: '', modelo: '', ano: 0, cor: '', km: 0, precoPorDia: 0, disponivel: true };
        this.listaCarrosComponent.atualizarCarros();  // Atualiza a lista de carros após a adição
      },
      error: (error) => {
        console.error('Erro ao adicionar carro:', error);
      }
    });
  }

  carroSelecionadoParaEdicao(carro: Carro): void {
    this.carroParaEditar = { ...carro };
  }

  confirmarEdicao(): void {
    if (this.carroParaEditar) {
      this.carroService.editarCarro(this.carroParaEditar.id, this.carroParaEditar).subscribe({
        next: (response) => {
          console.log('Carro atualizado:', response);
          this.carroParaEditar = null; // Limpa o modal após a edição
          this.listaCarrosComponent.atualizarCarros();  // Atualiza a lista de carros após a edição
        },
        error: (error) => {
          console.error('Erro ao atualizar carro:', error);
        }
      });
    }
  }

  carroExcluido(id: number): void {
    console.log('Carro excluído com ID:', id);
    this.listaCarrosComponent.atualizarCarros();  // Atualiza a lista de carros após a exclusão
  }

  aprovarLocacao(locacao: Locacao): void {
    if (locacao) {
      this.locacaoService.aprovarLocacao(locacao).subscribe({
        next: () => {
          this.carroService.atualizarDisponibilidade(locacao.carroId, false).subscribe({
            next: () => {
              alert(`Locação aprovada para carro ID: ${locacao.carroId}.`);
              this.locacoesPendentes = this.locacoesPendentes.filter(l => l.id !== locacao.id);
              this.locacaoSolicitada = null; // Limpar a locação solicitada após aprovação
            },
            error: (error) => {
              alert('Erro ao atualizar disponibilidade do carro.');
              console.error(error);
            }
          });
        },
        error: (error) => {
          alert('Erro ao aprovar locação.');
          console.error(error);
        }
      });
    } else {
      console.error('Locação não solicitada!');
    }
  }

  recusarLocacao(locacao: Locacao): void {
    if (locacao) {
      this.locacaoService.recusarLocacao(locacao.id).subscribe({
        next: () => {
          alert(`Locação recusada para carro ID: ${locacao.carroId}.`);
          this.locacoesPendentes = this.locacoesPendentes.filter(l => l.id !== locacao.id);
          this.locacaoSolicitada = null;  // Limpar a locação solicitada após recusa
        },
        error: (error) => {
          alert('Erro ao recusar locação.');
          console.error(error);
        }
      });
    }
  }
}
