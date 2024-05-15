package com.ensa.jibi.services;

import com.ensa.jibi.domain.dto.ComptePaiementDto;
import com.ensa.jibi.domain.entities.ComptePaiement;

import java.util.List;
import java.util.Optional;

public interface ComptePaimentService {
    ComptePaiement save(ComptePaiementDto comptePaiementDto);
    List<ComptePaiement> findAll();
    Optional<ComptePaiement> findOne(String id);
    boolean isExists(String id);
    ComptePaiement partialUpdate(String id, ComptePaiementDto comptePaiementDto);

    void delete(String id);

}
