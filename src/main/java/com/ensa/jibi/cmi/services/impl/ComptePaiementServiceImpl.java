package com.ensa.jibi.cmi.services.impl;

import com.ensa.jibi.backend.repositories.ClientRepository;
import com.ensa.jibi.backend.services.impl.ClientServiceImpl;
import com.ensa.jibi.cmi.domain.dto.ComptePaiementDto;
import com.ensa.jibi.cmi.domain.entities.ComptePaiement;
import com.ensa.jibi.cmi.mappers.impl.ComptePaiementMapperImpl;
import com.ensa.jibi.cmi.repositories.ComptePaiementRepository;
import com.ensa.jibi.cmi.services.ComptePaimentService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ComptePaiementServiceImpl implements ComptePaimentService {
    private final ComptePaiementRepository comptePaiementRepository;
    private final ComptePaiementMapperImpl compteMapper;
    private final ClientRepository clientRepository;

    @Autowired
    public ComptePaiementServiceImpl(ComptePaiementRepository comptePaiementRepository,
                                     ComptePaiementMapperImpl compteMapper,
                                     ClientRepository clientRepository) {
        this.comptePaiementRepository = comptePaiementRepository;
        this.compteMapper = compteMapper;
        this.clientRepository = clientRepository;
    }

    @Override
    public ComptePaiementDto save(ComptePaiementDto comptePaiementDto) {
        ComptePaiement comptePaiement = compteMapper.mapFrom(comptePaiementDto);
        return compteMapper.mapTo(comptePaiementRepository.save(comptePaiement));
    }

    @Override
    public List<ComptePaiementDto> findAll() {
        return comptePaiementRepository.findAll()
                .stream()
                .map(compteMapper::mapTo)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<ComptePaiementDto> findOne(String id) {
        return comptePaiementRepository.findById(id)
                .map(compte -> {
                    ComptePaiementDto compteDto = compteMapper.mapTo(compte);
                    return Optional.of(compteDto);
                }).orElseThrow(() -> new RuntimeException("ComptePaiement not found!"));
    }

    @Override
    public boolean isExists(String id) {
        return comptePaiementRepository.existsById(id);
    }

    @Override
    public ComptePaiementDto partialUpdate(String id, ComptePaiementDto comptePaiementDto) {
        return comptePaiementRepository.findById(id).map(
                existingCompte -> {
                    Optional.ofNullable(comptePaiementDto.getSolde())
                            .ifPresent(existingCompte::setSolde);
                    return compteMapper.mapTo(
                            comptePaiementRepository.save(existingCompte));
                }).orElseThrow(() -> new RuntimeException("ComptePaiement not found"));
    }

    @Override
    public ComptePaiementDto payer(String id, Long creanceId, Double montant) {
        Optional<ComptePaiement> optionalComptePaiement = comptePaiementRepository.findById(id);
        if (optionalComptePaiement.isPresent()) {
            ComptePaiement comptePaiement = optionalComptePaiement.get();
            // Logic for paying the creance and updating the solde
            comptePaiementRepository.save(comptePaiement);
            return compteMapper.mapTo(comptePaiement);
        } else {
            throw new EntityNotFoundException("ComptePaiement not found with id: " + id);
        }
    }

    @Override
    public void delete(String id) {
        if (comptePaiementRepository.existsById(id)) {
            comptePaiementRepository.deleteById(id);

            clientRepository.deleteByNumTel(id);
        } else {
            throw new EntityNotFoundException("ComptePaiement not found with id: " + id);
        }
    }

    @Override
    public boolean existsById(String id) {
        return comptePaiementRepository.existsById(id);
    }
}
