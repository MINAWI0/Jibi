package com.ensa.jibi.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ComptePaiement {
    @Id
    private Long id;
    private Double solde;

    @OneToMany(mappedBy = "compte" , cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ConfirmationPaiement> confirmationPaiements = new ArrayList<>();



}
