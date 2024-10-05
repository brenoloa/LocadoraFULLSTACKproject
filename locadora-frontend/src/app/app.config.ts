// src/app/app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Importar
import { AuthInterceptor } from './interceptors/auth.interceptor'; // Importar o interceptor
import { routes } from './app.routes';

// Importações necessárias para WebSocket
import { StompService } from '@stomp/ng2-stompjs';
import { stompConfig } from './services/stomp.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    HttpClientModule, // Para requisições HTTP
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // Permite múltiplos interceptores
    },
    {
      provide: StompService, // Adicionando o StompService
      useFactory: () => {
        const service = new StompService(stompConfig); // Iniciar o StompService com a configuração
        service.initAndConnect(); // Conectar ao WebSocket
        return service;
      }
    }
  ]
};
