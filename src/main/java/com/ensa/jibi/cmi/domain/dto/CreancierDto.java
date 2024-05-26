package com.ensa.jibi.cmi.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreancierDto {
    private Long id;
    private String nom;
    private String categorie;
    private String logoURL;
}
