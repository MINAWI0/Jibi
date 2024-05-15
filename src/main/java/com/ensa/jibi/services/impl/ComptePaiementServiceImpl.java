package com.ensa.jibi.services.impl;

import com.ensa.jibi.domain.dto.ComptePaiementDto;
import com.ensa.jibi.domain.entities.ComptePaiement;
import com.ensa.jibi.mappers.impl.ComptePaiementMapperImpl;
import com.ensa.jibi.repositories.ComptePaiementRepository;
import com.ensa.jibi.services.ComptePaimentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComptePaiementServiceImpl implements ComptePaimentService {
    private ComptePaiementRepository comptePaiementRepository;
    private ComptePaiementMapperImpl compteMapper;


    public ComptePaiementServiceImpl(ComptePaiementRepository comptePaiementRepository, ComptePaiementMapperImpl compteMapper) {
        this.comptePaiementRepository = comptePaiementRepository;
        this.compteMapper = compteMapper;
    }
    @Override
    public ComptePaiement save(ComptePaiementDto comptePaiementDto) {
        ComptePaiement comptePaiement = compteMapper.mapFrom(comptePaiementDto);
        return comptePaiementRepository.save(comptePaiement);
    }

    @Override
    public List<ComptePaiement> findAll() {
        return null;
    }

    @Override
    public Optional<ComptePaiement> findOne(String id) {
        return Optional.empty();
    }

    @Override
    public boolean isExists(String id) {
        return false;
    }

    @Override
    public ComptePaiement partialUpdate(String id, ComptePaiementDto comptePaiementDto) {
        return null;
    }

    @Override
    public void delete(String id) {

    }
}
