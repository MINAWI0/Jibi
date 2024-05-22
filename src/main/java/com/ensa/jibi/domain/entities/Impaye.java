package com.ensa.jibi.domain.entities;

import com.ensa.jibi.domain.entities.creance.Creance;
import com.ensa.jibi.domain.enums.ImpayeType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Impaye {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Double montant;

    private ImpayeType type;
    private LocalDate date;
    @ManyToOne
    @JoinColumn(name = "creance_id")
    @JsonIgnore
    private Creance creance;

}
