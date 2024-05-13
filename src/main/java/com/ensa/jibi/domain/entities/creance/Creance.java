package com.ensa.jibi.domain.entities.creance;

import com.ensa.jibi.domain.entities.ConfirmationPaiement;
import com.ensa.jibi.domain.entities.Impaye;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    //je sais pas ci jsonIgnore est essentielle
    // TODO:: l'essayer apres avoir creé les services
    private List<Impaye> impayes = new ArrayList<>();

}
