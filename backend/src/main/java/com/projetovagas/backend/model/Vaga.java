package com.projetovagas.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Vaga {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String empresa;
    private String cidade;
    private String tipo;       // CLT / PJ / Estágio
    private String descricao;
    private Double salario;
}
