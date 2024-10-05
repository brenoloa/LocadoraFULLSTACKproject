package com.example.locadora.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.locadora.model.Funcionario;
import com.example.locadora.repository.FuncionarioRepository;

@Service
public class FuncionarioService {
    
    @Autowired
    private FuncionarioRepository funcionarioRepository;

    public Funcionario findByEmail(String email) {
        return funcionarioRepository.findByEmail(email);
    }
    
    public Funcionario findByEmailAndSenha(String email, String senha) {
        return funcionarioRepository.findByEmailAndSenha(email, senha);
    }

    public void save(Funcionario funcionario) {
        funcionarioRepository.save(funcionario);
    }
}
