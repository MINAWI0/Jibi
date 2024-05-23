package com.ensa.jibi.backend.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Agent extends User{
    private String cin;
    private String passeport;
    private LocalDate dateNaissance;
    private String adresse;
    private String email;

    @Column(unique = true)
    private String numTel;

    private String numCommerce;
    private String numPatente;
//    private String docUrl;
    @OneToMany(mappedBy = "agent" , cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Document> documents = new ArrayList<>();


}
