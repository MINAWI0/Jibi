package com.ensa.jibi.cmi.services;

import com.ensa.jibi.cmi.domain.dto.ComptePaiementDto;

import java.util.List;
import java.util.Optional;

public interface ComptePaimentService {
    ComptePaiementDto save(ComptePaiementDto comptePaiementDto);
    List<ComptePaiementDto> findAll();
    Optional<ComptePaiementDto> findOne(String id);
    boolean isExists(String id);
    ComptePaiementDto partialUpdate(String id, ComptePaiementDto comptePaiementDto);

    ComptePaiementDto payer(String compteId,Long creanceId, Double montant);


    void delete(String id);

}
