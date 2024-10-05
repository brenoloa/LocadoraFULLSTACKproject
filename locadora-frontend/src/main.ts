// src/app/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Altere para importação nomeada
import { appConfig } from './app/app.config'; // Importando a configuração do app

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(),
        provideRouter(routes),
        ...appConfig.providers // Usando os providers do appConfig
    ]
}).catch(err => console.error(err));
