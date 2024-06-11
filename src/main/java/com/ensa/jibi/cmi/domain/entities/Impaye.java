package com.ensa.jibi.cmi.domain.entities;

import com.ensa.jibi.cmi.domain.entities.creance.Creance;
import com.ensa.jibi.cmi.domain.entities.creance.Facture;
import com.ensa.jibi.cmi.domain.enums.ImpayeType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Impaye {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double montant;

    @Enumerated(EnumType.STRING)
    private ImpayeType type;
    private LocalDate date;
    @ManyToOne
    @JoinColumn(name = "facture_id")
    @JsonIgnore
    private Facture facture;

}
