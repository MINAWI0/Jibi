package com.ensa.jibi.services.impl;

import com.ensa.jibi.domain.dto.ComptePaiementDto;
import com.ensa.jibi.domain.entities.ComptePaiement;
import com.ensa.jibi.domain.entities.ConfirmationPaiement;
import com.ensa.jibi.repositories.ComptePaiementRepository;
import com.ensa.jibi.repositories.ConfirmationPaiementRepository;
import com.ensa.jibi.services.ConfirmationPaiementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;


@Service
public class ConfirmationPaiementServiceImpl implements ConfirmationPaiementService {
    private final ConfirmationPaiementRepository confirmationPaiementRepository;
    private final ComptePaiementRepository comptePaiementRepository;
    @Autowired
    public ConfirmationPaiementServiceImpl(ConfirmationPaiementRepository confirmationPaiementRepository , ComptePaiementRepository comptePaiementRepository) {
        this.confirmationPaiementRepository = confirmationPaiementRepository;
        this.comptePaiementRepository = comptePaiementRepository;
    }

    @Override
    public List<ConfirmationPaiement> getAllConfirmations() {
        return confirmationPaiementRepository.findAll();
    }

    @Override
    public Optional<ConfirmationPaiement> getConfirmationByCompte(ComptePaiementDto comptePaiementDto) {
        Optional<ComptePaiement> optionalCompte = comptePaiementRepository.findById(comptePaiementDto.getId());

        if (optionalCompte.isPresent()) {
            ComptePaiement compte = optionalCompte.get();

            // Retrieve all ConfirmationPaiement instances associated with the ComptePaiement
            return confirmationPaiementRepository.findByCompte(compte);
        } else {
            return Optional.empty();
        }
    }


    @Override
    public ConfirmationPaiement createConfirmation(ConfirmationPaiement confirmationPaiement) {
        // need validation
        return confirmationPaiementRepository.save(confirmationPaiement);

    }

}
