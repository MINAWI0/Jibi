package com.ensa.jibi.services.impl;

import com.ensa.jibi.domain.entities.ConfirmationPaiement;
import com.ensa.jibi.repositories.ConfirmationPaiementRepository;
import com.ensa.jibi.services.ConfirmationPaiementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ConfirmationPaiementServiceImpl implements ConfirmationPaiementService {
    private final ConfirmationPaiementRepository confirmationPaiementRepository;

    @Autowired
    public ConfirmationPaiementServiceImpl(ConfirmationPaiementRepository confirmationPaiementRepository) {
        this.confirmationPaiementRepository = confirmationPaiementRepository;
    }

    @Override
    public List<ConfirmationPaiement> getAllConfirmations() {
        return confirmationPaiementRepository.findAll();
    }

    @Override
    public Optional<ConfirmationPaiement> getConfirmationById(Long id) {
        return confirmationPaiementRepository.findById(id);
    }

    @Override
    public ConfirmationPaiement createConfirmation(ConfirmationPaiement confirmationPaiement) {
        return null;
    }

}
