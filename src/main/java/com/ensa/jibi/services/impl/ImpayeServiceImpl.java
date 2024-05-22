package com.ensa.jibi.services.impl;

import com.ensa.jibi.domain.entities.Impaye;
import com.ensa.jibi.repositories.ImpayeRepository;
import com.ensa.jibi.services.ImpayeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImpayeServiceImpl implements ImpayeService {
    @Autowired
    private ImpayeRepository impayeRepository;
    @Override
    public List<Impaye> getImpayesByFacture(Long factureId) {
        return impayeRepository.findByCreanceId(factureId);
    }
}
