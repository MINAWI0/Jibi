package com.ensa.jibi.domain.entities;

import com.ensa.jibi.domain.entities.creance.Creance;
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
