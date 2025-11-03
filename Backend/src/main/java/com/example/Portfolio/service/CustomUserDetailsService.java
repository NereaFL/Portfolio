package com.example.Portfolio.service;

import com.example.Portfolio.model.User;
import com.example.Portfolio.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        // ✅ Aseguramos que todos los roles lleven el prefijo ROLE_
        String[] authorities = user.getRoles().stream()
                .map(role -> {
                    String name = role.getName();
                    if (!name.startsWith("ROLE_")) {
                        name = "ROLE_" + name;
                    }
                    return name;
                })
                .collect(Collectors.toList())
                .toArray(new String[0]);

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities(authorities)
                .build();
    }
}
