package com.example.locadora.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority; // Altere para o seu pacote
import org.springframework.security.core.userdetails.UserDetails; // Altere para o seu pacote
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.locadora.model.Cliente;
import com.example.locadora.model.Funcionario;
import com.example.locadora.repository.ClienteRepository;
import com.example.locadora.repository.FuncionarioRepository;

@Service
public class UsuarioDetailsService implements UserDetailsService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Cliente cliente = clienteRepository.findByEmail(email);
        if (cliente != null) {
            // Aqui você pode definir o papel do Cliente
            List<SimpleGrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority("ROLE_CLIENTE")); // Definindo o papel do Cliente
            
            return new org.springframework.security.core.userdetails.User(
                cliente.getEmail(),
                cliente.getSenha(),
                authorities // Adicionando as autoridades (papéis)
            );
        }

        Funcionario funcionario = funcionarioRepository.findByEmail(email);
        if (funcionario != null) {
            // Aqui você pode definir o papel do Funcionário
            List<SimpleGrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority("ROLE_FUNCIONARIO")); // Definindo o papel do Funcionário
            
            return new org.springframework.security.core.userdetails.User(
                funcionario.getEmail(),
                funcionario.getSenha(),
                authorities // Adicionando as autoridades (papéis)
            );
        }

        throw new UsernameNotFoundException("Usuário não encontrado com o email: " + email);
    }
}
