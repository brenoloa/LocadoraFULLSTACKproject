import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Locacao } from '../models/locacao.model';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {
  private locacaoSubject = new BehaviorSubject<Locacao | null>(null);
  locacao$ = this.locacaoSubject.asObservable();

  enviarNotificacao(locacao: Locacao) {
    this.locacaoSubject.next(locacao);
  }

  limparNotificacao() {
    this.locacaoSubject.next(null);
  }
}
