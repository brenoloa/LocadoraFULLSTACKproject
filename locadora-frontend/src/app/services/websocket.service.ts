import { Injectable } from '@angular/core';
import { StompService, StompConfig } from '@stomp/ng2-stompjs';
import { Observable } from 'rxjs';
import { Message } from '@stomp/stompjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  constructor(private stompService: StompService) {}

  connectToLocacaoNotifications(): Observable<string> {
    return this.stompService.subscribe('/topic/locacao').pipe(
      map((message: Message) => message.body)
    );
  }
}
