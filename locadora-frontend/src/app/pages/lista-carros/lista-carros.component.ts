import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CarroService } from '../../services/carro.service';
import { Carro } from '../../models/carro.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lista-carros',
  templateUrl: './lista-carros.component.html',
  styleUrls: ['./lista-carros.component.css']
})
export class ListaCarrosComponent implements OnInit {
  carros: Carro[] = [];
  loading: boolean = true;

  @Output() carroSelecionadoParaEdicao = new EventEmitter<Carro>();
  @Output() carroExcluido = new EventEmitter<number>();

  constructor(private carroService: CarroService) {}

  ngOnInit(): void {
    this.atualizarCarros(); // Carrega a lista de carros ao iniciar o componente
  }

  atualizarCarros(): void {
    this.carroService.listarCarros().subscribe(
      (data: Carro[]) => { // Especifica o tipo de data
        this.carros = data;
        this.loading = false;
      },
      (error: HttpErrorResponse) => { // Especifica o tipo de error
        console.error('Erro ao carregar carros:', error);
        this.loading = false;
      }
    );
  }

  selecionarCarroParaEdicao(carro: Carro): void {
    this.carroSelecionadoParaEdicao.emit(carro); // Emitir o carro para o componente pai
  }

  excluirCarro(id: number): void {
    this.carroService.excluirCarro(id).subscribe(
      () => {
        this.carroExcluido.emit(id); // Emitir o ID do carro excluído
        this.atualizarCarros(); // Atualiza a lista de carros após a exclusão
      },
      (error: HttpErrorResponse) => {
        console.error('Erro ao excluir carro:', error);
      }
    );
  }
}
