import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Locacao } from '../models/locacao.model';

@Injectable({
  providedIn: 'root'
})
export class LocacaoService {
  private apiUrl = 'http://localhost:8080/api/locacoes';
  private locacaoSubject = new BehaviorSubject<Locacao | null>(null); // Subject para emitir locações
  locacao$ = this.locacaoSubject.asObservable(); // Observable para ser usado em outros componentes

  constructor(private http: HttpClient) {}

  // Método para registrar a solicitação de locação
  registrarSolicitacao(locacao: Locacao): void {
    this.locacaoSubject.next(locacao); // Emite a locação quando registrada
  }

  // Método para listar locações
  listarLocacoes(): Observable<Locacao[]> {
    return this.http.get<Locacao[]>(this.apiUrl);
  }

  // Método para aprovar locação
  aprovarLocacao(locacao: Locacao): Observable<Locacao> {
    return this.http.post<Locacao>(this.apiUrl, locacao); // Realiza o POST somente ao aprovar
  }

  // Método para recusar locação
  recusarLocacao(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/recusar`, null);
  }

  // Método para atualizar a disponibilidade do carro
  atualizarDisponibilidade(carroId: number, disponivel: boolean): Observable<void> {
    return this.http.put<void>(`http://localhost:8080/api/carros/${carroId}/disponibilidade`, { disponivel });
  }
}
