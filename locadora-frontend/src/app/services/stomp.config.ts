import { StompConfig } from '@stomp/ng2-stompjs';

export const stompConfig: StompConfig = {
  url: () => {
    const token = localStorage.getItem('token'); // Pegar o token JWT armazenado no localStorage
    return `ws://localhost:8080/ws?token=${token}`; // Passando o token JWT na URL
  },
  headers: {},
  heartbeat_in: 0, // Sem heartbeat
  heartbeat_out: 20000, // Enviar heartbeat a cada 20 segundos
  reconnect_delay: 5000, // Tentar reconectar a cada 5 segundos
  debug: true, // Debug ativado para desenvolvimento (desativar em produção)
};
