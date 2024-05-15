package com.ensa.jibi.services.impl;

import com.ensa.jibi.domain.dto.ComptePaiementDto;
import com.ensa.jibi.domain.entities.ComptePaiement;
import com.ensa.jibi.mappers.impl.ComptePaiementMapperImpl;
import com.ensa.jibi.repositories.ComptePaiementRepository;
import com.ensa.jibi.services.ComptePaimentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

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
    public void delete(String id) {
        comptePaiementRepository.deleteById(id);
    }
}
