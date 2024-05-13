package com.ensa.jibi.domain.entities.creance;

import com.ensa.jibi.domain.entities.ConfirmationPaiement;
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
public class Creance {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nom;
    private String description;

    @OneToMany(mappedBy = "creance" , cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ConfirmationPaiement> confirmationPaiements = new ArrayList<>();


}
