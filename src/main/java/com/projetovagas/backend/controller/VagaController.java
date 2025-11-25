package com.projetovagas.backend.controller;

import com.projetovagas.backend.model.Vaga;
import com.projetovagas.backend.repository.VagaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/vagas")
@CrossOrigin(origins = "*") // permite o front acessar sem erro
public class VagaController {

    @Autowired
    private VagaRepository repo;

    @GetMapping
    public List<Vaga> all() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vaga> getById(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Vaga> create(@RequestBody Vaga vaga) {
        Vaga saved = repo.save(vaga);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
