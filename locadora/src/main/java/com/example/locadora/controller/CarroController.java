package com.example.locadora.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.locadora.model.Carro;
import com.example.locadora.repository.CarroRepository;

@RestController
@RequestMapping("/api/carros")
public class CarroController {

    @Autowired
    private CarroRepository carroRepository;

    // Qualquer usuário pode listar carros
    @GetMapping
    public List<Carro> listarCarros() {
        return carroRepository.findAll();
    }

    // Somente funcionários podem adicionar carros
    @PostMapping
    public Carro adicionarCarro(@RequestBody Carro carro) {
        carro.setDisponivel(true); // Garantindo que o carro adicionado esteja disponível
        return carroRepository.save(carro);
    }

    // Somente funcionários podem editar carros
    @PutMapping("/{id}")
    public ResponseEntity<Carro> editarCarro(@PathVariable Long id, @RequestBody Carro carroDetalhes) {
        Carro carro = carroRepository.findById(id).orElseThrow();
        carro.setMarca(carroDetalhes.getMarca());
        carro.setModelo(carroDetalhes.getModelo());
        carro.setAno(carroDetalhes.getAno());
        carro.setCor(carroDetalhes.getCor());
        carro.setKm(carroDetalhes.getKm());
        carro.setPrecoPorDia(carroDetalhes.getPrecoPorDia());
        Carro carroAtualizado = carroRepository.save(carro);
        return ResponseEntity.ok(carroAtualizado);
    }

    // Somente funcionários podem excluir carros
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarCarro(@PathVariable Long id) {
        carroRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
