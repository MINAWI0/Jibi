package com.ensa.jibi.cmi.domain.entities;

import com.ensa.jibi.cmi.domain.enums.ImpayeType;
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

    @Enumerated(EnumType.STRING)
    private ImpayeType type;
    private LocalDate date;

}
