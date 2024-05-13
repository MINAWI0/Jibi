package com.ensa.jibi.domain.entities;

import com.ensa.jibi.domain.enums.ImpayeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

}
