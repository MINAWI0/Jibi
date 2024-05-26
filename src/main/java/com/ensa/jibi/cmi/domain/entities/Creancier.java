package com.ensa.jibi.cmi.domain.entities;

import com.ensa.jibi.cmi.domain.entities.creance.Creance;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Creancier {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nom;
    private String categorie;
    private String logoURL;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Creance> creances = new ArrayList<>();


}
