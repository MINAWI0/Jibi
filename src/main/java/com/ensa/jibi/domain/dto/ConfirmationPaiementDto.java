package com.ensa.jibi.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConfirmationPaiementDto {
    private Long id;
    private Double montant;
    private Long compteId;
    private Long creanceId;
    private LocalDate date;
}