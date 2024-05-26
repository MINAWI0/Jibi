package com.ensa.jibi.cmi.services.impl;

import com.ensa.jibi.cmi.domain.entities.Impaye;
import com.ensa.jibi.cmi.repositories.ImpayeRepository;
import com.ensa.jibi.cmi.services.ImpayeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImpayeServiceImpl implements ImpayeService {
    @Autowired
    private ImpayeRepository impayeRepository;
    @Override
    public List<Impaye> getImpayesByFacture(Long numFacture) {
        return impayeRepository.findByFacture_NumFacture(numFacture);
    }
}
