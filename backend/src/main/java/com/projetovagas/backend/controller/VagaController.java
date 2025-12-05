package com.projetovagas.backend.controller;

import com.projetovagas.backend.model.Vaga;
import com.projetovagas.backend.repository.VagaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/vagas")
@CrossOrigin(origins = "*")
public class VagaController {

    @Autowired
    private VagaRepository repo;

    @GetMapping
    public List<Vaga> all() {
        return repo.findAll();
    }

    @GetMapping("/whoami")
    public Map<String,Object> whoami(org.springframework.security.core.Authentication auth) {
    Map<String,Object> m = new HashMap<>();
    if (auth == null) {
        m.put("authenticated", false);
    } else {
        m.put("authenticated", true);
        m.put("name", auth.getName());
        m.put("authorities", auth.getAuthorities().toString());
    }
    return m;
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

    @PutMapping("/{id}")
    public ResponseEntity<Vaga> update(@PathVariable Long id, @RequestBody Vaga nova) {
        return repo.findById(id)
                .map(v -> {
                    v.setTitulo(nova.getTitulo());
                    v.setDescricao(nova.getDescricao());
                    v.setSalario(nova.getSalario());
                    v.setEmpresa(nova.getEmpresa());
                    v.setCidade(nova.getCidade());
                    v.setTipo(nova.getTipo());
                    Vaga updated = repo.save(v);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
