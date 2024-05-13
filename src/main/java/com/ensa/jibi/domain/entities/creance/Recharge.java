package com.ensa.jibi.domain.entities.creance;

import com.ensa.jibi.domain.enums.RechargeAmmount;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Recharge extends Creance{
    @Enumerated(EnumType.ORDINAL)
    private RechargeAmmount montant;
    private String email;
}
