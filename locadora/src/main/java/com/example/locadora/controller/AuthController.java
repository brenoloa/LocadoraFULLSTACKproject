package com.example.locadora.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.locadora.model.Cliente;
import com.example.locadora.model.Funcionario;
import com.example.locadora.model.LoginRequest;
import com.example.locadora.security.JwtTokenUtil;
import com.example.locadora.service.ClienteService;
import com.example.locadora.service.FuncionarioService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private FuncionarioService funcionarioService;

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private PasswordEncoder passwordEncoder; // Adicionando o PasswordEncoder

    @PostMapping("/login/funcionario")
    public ResponseEntity<?> loginFuncionario(@RequestBody LoginRequest loginRequest) {
        Funcionario funcionario = funcionarioService.findByEmail(loginRequest.getEmail());
        
        if (funcionario != null && passwordEncoder.matches(loginRequest.getSenha(), funcionario.getSenha())) {
            String token = jwtTokenUtil.generateToken(funcionario.getEmail());
            return ResponseEntity.ok().body(Map.of("token", token));  // Retornar token como JSON
        } else {
            return ResponseEntity.status(401).body("Credenciais inválidas");
        }
    }
    
    @PostMapping("/login/cliente")
    public ResponseEntity<?> loginCliente(@RequestBody LoginRequest loginRequest) {
        Cliente cliente = clienteService.findByEmail(loginRequest.getEmail());
        
        if (cliente != null && passwordEncoder.matches(loginRequest.getSenha(), cliente.getSenha())) {
            String token = jwtTokenUtil.generateToken(cliente.getEmail());
            return ResponseEntity.ok().body(Map.of("token", token));  // Retornar token como JSON
        } else {
            return ResponseEntity.status(401).body("Credenciais inválidas");
        }
    }
    
    @PostMapping("/registrar-funcionario")
    public ResponseEntity<String> registerFuncionario(@RequestBody Funcionario funcionario) {
        if (funcionarioService.findByEmail(funcionario.getEmail()) != null) {
            return ResponseEntity.status(400).body("Funcionário já cadastrado com este e-mail.");
        }
        funcionario.setSenha(passwordEncoder.encode(funcionario.getSenha())); // Criptografa a senha
        funcionarioService.save(funcionario);
        return ResponseEntity.ok("Funcionário registrado com sucesso!");
    }
    
    @PostMapping("/registrar-cliente")
    public ResponseEntity<String> registerCliente(@RequestBody Cliente cliente) {
        if (clienteService.findByEmail(cliente.getEmail()) != null) {
            return ResponseEntity.status(400).body("Cliente já cadastrado com este e-mail.");
        }
        cliente.setSenha(passwordEncoder.encode(cliente.getSenha())); // Criptografa a senha
        clienteService.save(cliente);
        return ResponseEntity.ok("Cliente registrado com sucesso!");
    }
}
