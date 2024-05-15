package com.ensa.jibi.cmi.services.impl;

import com.ensa.jibi.cmi.domain.dto.ComptePaiementDto;
import com.ensa.jibi.cmi.domain.entities.ComptePaiement;
import com.ensa.jibi.cmi.exceptions.InsufficientBalanceException;
import com.ensa.jibi.cmi.mappers.impl.ComptePaiementMapperImpl;
import com.ensa.jibi.cmi.repositories.ComptePaiementRepository;
import com.ensa.jibi.cmi.services.ComptePaimentService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ComptePaiementServiceImpl implements ComptePaimentService {
    private ComptePaiementRepository comptePaiementRepository;
    private ComptePaiementMapperImpl compteMapper;


    public ComptePaiementServiceImpl(ComptePaiementRepository comptePaiementRepository, ComptePaiementMapperImpl compteMapper) {
        this.comptePaiementRepository = comptePaiementRepository;
        this.compteMapper = compteMapper;
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
    public ComptePaiementDto payer(String id,Long creanceId, Double montant){
//            throws InsufficientBalanceException {
        Optional<ComptePaiement> optionalComptePaiement = comptePaiementRepository.findById(id);
        //TODO::find the creance needed by id
        if (optionalComptePaiement.isPresent()) {
            ComptePaiement comptePaiement = optionalComptePaiement.get();
//            comptePaiement.payer(montant, creance);
            comptePaiementRepository.save(comptePaiement);
            return compteMapper.mapTo(comptePaiement);
        } else {
            throw new EntityNotFoundException("ComptePaiement not found with id: " + id);
        }
    }

    @Override
    public void delete(String id) {
        comptePaiementRepository.deleteById(id);
    }
}
