package com.ensa.jibi.services;

import com.ensa.jibi.domain.dto.ComptePaiementDto;
import com.ensa.jibi.domain.entities.ComptePaiement;

import java.util.List;
import java.util.Optional;

public interface ComptePaimentService {
    ComptePaiementDto save(ComptePaiementDto comptePaiementDto);
    List<ComptePaiementDto> findAll();
    Optional<ComptePaiementDto> findOne(String id);
    boolean isExists(String id);
    ComptePaiementDto partialUpdate(String id, ComptePaiementDto comptePaiementDto);

    void delete(String id);

}
