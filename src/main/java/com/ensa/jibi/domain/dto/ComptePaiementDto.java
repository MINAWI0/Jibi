package com.ensa.jibi.domain.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ComptePaiementDto {
    private String id;//phone number of client
    private Double solde;
}
