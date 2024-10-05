import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError, tap } from 'rxjs';
import { Carro } from '../models/carro.model';
import { Locacao } from '../models/locacao.model';

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  private apiUrl = 'http://localhost:8080/api/carros';
  private locacaoUrl = 'http://localhost:8080/api/locacoes'; // URL para locação

  constructor(private http: HttpClient) {}

  // Método para listar todos os carros
  listarCarros(): Observable<Carro[]> {
    const token = localStorage.getItem('token'); // Pegar o token JWT armazenado no localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Adicionando o token ao cabeçalho
    });

    return this.http.get<Carro[]>(this.apiUrl, { headers }).pipe(
      tap(data => console.log('Carros retornados da API:', data)),
      catchError(error => {
        console.error('Erro ao chamar a API:', error);
        return throwError(error);
      })
    );
  }

  // Método para listar carros disponíveis
  listarCarrosDisponiveis(): Observable<Carro[]> {
    const token = localStorage.getItem('token'); // Pegar o token JWT armazenado no localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Adicionando o token ao cabeçalho
    });

    return this.http.get<Carro[]>(`${this.apiUrl}?disponivel=true`, { headers }).pipe(
      tap(data => console.log('Carros disponíveis retornados da API:', data)),
      catchError(error => {
        console.error('Erro ao carregar carros disponíveis:', error);
        return throwError(error);
      })
    );
  }

  // Método para adicionar um carro
  adicionarCarro(carro: Carro): Observable<Carro> {
    const token = localStorage.getItem('token'); // Pegar o token JWT armazenado no localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Adicionando o token ao cabeçalho
    });

    return this.http.post<Carro>(this.apiUrl, carro, { headers }).pipe(
      tap(data => console.log('Carro adicionado:', data)),
      catchError(error => {
        console.error('Erro ao adicionar carro:', error);
        return throwError(error);
      })
    );
  }

  // Método para editar um carro
  editarCarro(id: number, carro: Carro): Observable<Carro> {
    const token = localStorage.getItem('token'); // Pegar o token JWT armazenado no localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Adicionando o token ao cabeçalho
    });

    return this.http.put<Carro>(`${this.apiUrl}/${id}`, carro, { headers }).pipe(
      tap(data => console.log('Carro atualizado:', data)),
      catchError(error => {
        console.error('Erro ao atualizar carro:', error);
        return throwError(error);
      })
    );
  }

  // Método para excluir um carro
  excluirCarro(id: number): Observable<any> {
    const token = localStorage.getItem('token'); // Pegar o token JWT armazenado no localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Adicionando o token ao cabeçalho
    });

    return this.http.delete(`${this.apiUrl}/${id}`, { headers }).pipe(
      tap(() => console.log(`Carro com ID ${id} excluído com sucesso.`)),
      catchError(error => {
        console.error('Erro ao excluir carro:', error);
        return throwError(error);
      })
    );
  }

  // Método para solicitar aluguel
  solicitarAluguel(carroId: number, dataInicio: Date, dataFim: Date): Observable<any> {
    const token = localStorage.getItem('token'); // Pegar o token JWT armazenado no localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Adicionando o token ao cabeçalho
    });

    const locacao: Locacao = {
      id: 0, // ID deve ser gerado pelo servidor
      carroId: carroId,
      clienteNome: 'Nome do Cliente', // Ajuste para usar o nome do cliente logado
      dataLocacao: dataInicio,
      dataDevolucao: dataFim,
      aprovado: false // Inicialmente, a locação não é aprovada
    };

    return this.http.post(this.locacaoUrl, locacao, { headers }).pipe(
      tap(data => console.log('Solicitação de locação enviada:', data)),
      catchError(error => {
        console.error('Erro ao solicitar aluguel:', error);
        return throwError(error);
      })
    );
  }

  // Método para atualizar a disponibilidade do carro
  atualizarDisponibilidade(carroId: number, disponivel: boolean): Observable<any> {
    const token = localStorage.getItem('token'); // Pegar o token JWT armazenado no localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Adicionando o token ao cabeçalho
    });

    return this.http.patch(`${this.apiUrl}/${carroId}`, { disponivel }, { headers }).pipe(
      tap(() => console.log(`Disponibilidade do carro ${carroId} atualizada para ${disponivel}.`)),
      catchError(error => {
        console.error('Erro ao atualizar a disponibilidade do carro:', error);
        return throwError(error);
      })
    );
  }
}
