package com.example.locadora.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.locadora.model.Cliente;
import com.example.locadora.repository.ClienteRepository;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public Cliente findByEmail(String email) {
        return clienteRepository.findByEmail(email);
    }
    
    public Cliente findByEmailAndSenha(String email, String senha) {
        return clienteRepository.findByEmailAndSenha(email, senha);
    }

    public void save(Cliente cliente) {
        clienteRepository.save(cliente);
    }
}
