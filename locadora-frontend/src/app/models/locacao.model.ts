export class Locacao {
  id: number; // Adicione isso se ainda não existir
  carroId: number; // ID do carro
  clienteNome: string; // Nome do locatário
  dataLocacao: Date; // Data de locação
  dataDevolucao: Date; // Data de devolução
  aprovado: boolean; // Status da locação

  constructor() {
    this.id = 0; // Inicializando com valor padrão
    this.carroId = 0;
    this.clienteNome = '';
    this.dataLocacao = new Date();
    this.dataDevolucao = new Date();
    this.aprovado = false;
  }
}
