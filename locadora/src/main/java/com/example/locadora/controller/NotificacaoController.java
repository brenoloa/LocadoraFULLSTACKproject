package com.example.locadora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notificacoes")
public class NotificacaoController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping("/locacao")
    public void enviarNotificacaoLocacao(@RequestBody String mensagem) {
        messagingTemplate.convertAndSend("/topic/locacao", mensagem); // Envia mensagem para os assinantes do tópico
    }
}
