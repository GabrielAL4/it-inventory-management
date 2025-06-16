package com.inventory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventory.model.User;
import com.inventory.repository.UserRepository;

@RestController
@RequestMapping("/api/init")
public class AdminInitController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/admin")
    public ResponseEntity<?> initializeAdmin() {
        if (userRepository.findByUsername("admin").isPresent()) {
            return ResponseEntity.ok().body("Admin user already exists");
        }

        User adminUser = new User();
        adminUser.setUsername("admin");
        adminUser.setPassword(passwordEncoder.encode("Cis@1081"));
        adminUser.setEmail("admin@itinventory.com");
        adminUser.setRole("ROLE_ADMIN");

        userRepository.save(adminUser);

        return ResponseEntity.ok().body("Admin user created successfully");
    }
} 