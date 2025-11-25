package com.projetovagas.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.projetovagas.backend.model.Vaga;

public interface VagaRepository extends JpaRepository<Vaga, Long> {
}
