export interface Carro {
  id: number;
  marca: string;
  modelo: string;
  ano: number;
  cor: string;
  km: number;
  precoPorDia: number;
  disponivel: boolean; // Certifique-se de que a propriedade disponível está aqui
}
