package com.ensa.jibi.domain.entities;

import com.ensa.jibi.domain.entities.creance.Creance;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ConfirmationPaiement {
    //la meme classe sera utilisé pour l'historique des transactions
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Double montant;

    @ManyToOne
    private ComptePaiement compte;

    @ManyToOne
    private Creance creance;

    private LocalDate date;

}
