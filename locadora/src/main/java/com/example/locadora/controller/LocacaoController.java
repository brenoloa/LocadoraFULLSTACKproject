package com.example.locadora.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.locadora.model.Carro;
import com.example.locadora.model.Locacao;
import com.example.locadora.repository.CarroRepository;
import com.example.locadora.repository.LocacaoRepository;

@RestController
@RequestMapping("/api/locacoes")
public class LocacaoController {

    @Autowired
    private LocacaoRepository locacaoRepository;

    @Autowired
    private CarroRepository carroRepository; // Certifique-se de ter o repositório de carro injetado

    @PostMapping
    public ResponseEntity<Locacao> solicitarLocacao(@RequestBody Locacao locacao) {
        locacao.setAprovado(false); // Inicialmente, a locação não é aprovada
        Locacao novaLocacao = locacaoRepository.save(locacao);

        // Aqui você pode adicionar lógica para atualizar a disponibilidade do carro
        Optional<Carro> carroOptional = carroRepository.findById(locacao.getCarroId());
        if (carroOptional.isPresent()) {
            Carro carro = carroOptional.get();
            carro.setDisponivel(false); // Marcar o carro como não disponível
            carroRepository.save(carro); // Salvar as alterações no carro
        }

        return ResponseEntity.ok(novaLocacao);
    }

    @GetMapping
    public ResponseEntity<List<Locacao>> listarLocacoes() {
        List<Locacao> locacoes = locacaoRepository.findAll();
        return ResponseEntity.ok(locacoes);
    }

    @PatchMapping("/{id}/aprovar")
    public ResponseEntity<Void> aprovarLocacao(@PathVariable Long id) {
        Optional<Locacao> locacao = locacaoRepository.findById(id);
        if (locacao.isPresent()) {
            Locacao l = locacao.get();
            l.setAprovado(true);
            locacaoRepository.save(l);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}/recusar")
    public ResponseEntity<Void> recusarLocacao(@PathVariable Long id) {
        Optional<Locacao> locacao = locacaoRepository.findById(id);
        if (locacao.isPresent()) {
            locacaoRepository.delete(locacao.get());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}