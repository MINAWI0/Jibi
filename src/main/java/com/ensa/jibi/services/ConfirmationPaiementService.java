package com.ensa.jibi.services;

import com.ensa.jibi.domain.dto.ComptePaiementDto;
import com.ensa.jibi.domain.entities.ComptePaiement;
import com.ensa.jibi.domain.entities.ConfirmationPaiement;

import java.util.List;
import java.util.Optional;

public interface ConfirmationPaiementService {
        List<ConfirmationPaiement> getAllConfirmations();
        Optional<ConfirmationPaiement> getConfirmationByCompte(ComptePaiementDto comptePaiementDto);
        ConfirmationPaiement createConfirmation(ConfirmationPaiement confirmationPaiement);
}
