package com.ensa.jibi.backend.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Document {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String docUrl;
    private String description;

    @ManyToOne
    private Agent agent;

    @ManyToOne
    private Client client;
}
