package com.ensa.jibi.backend.domain.entities;

import com.ensa.jibi.backend.domain.enums.ClientType;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Client extends User{
    private String email;
    @Column(unique = true)
    private String numTel;
    @Enumerated(EnumType.ORDINAL)
    private ClientType clientType;
    @OneToMany(mappedBy = "client" , cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonBackReference
    private List<Document> documents = new ArrayList<>();
}
