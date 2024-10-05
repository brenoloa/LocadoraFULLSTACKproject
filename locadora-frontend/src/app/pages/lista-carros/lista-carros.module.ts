import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaCarrosComponent } from './lista-carros.component'; // Certifique-se de que o caminho está correto

@NgModule({
  declarations: [ListaCarrosComponent],
  imports: [CommonModule],
  exports: [ListaCarrosComponent] // Exporte o componente para que ele possa ser usado em outros módulos
})
export class ListaCarrosModule {}
