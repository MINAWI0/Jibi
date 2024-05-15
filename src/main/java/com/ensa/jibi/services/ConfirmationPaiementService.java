package com.ensa.jibi.services;

import com.ensa.jibi.domain.entities.ConfirmationPaiement;

import java.util.List;
import java.util.Optional;

public interface ConfirmationPaiementService {
        List<ConfirmationPaiement> getAllConfirmations();
        Optional<ConfirmationPaiement> getConfirmationById(Long id);
        ConfirmationPaiement createConfirmation(ConfirmationPaiement confirmationPaiement);
}
