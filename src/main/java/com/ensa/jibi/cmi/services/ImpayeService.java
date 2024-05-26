package com.ensa.jibi.cmi.services;

import com.ensa.jibi.cmi.domain.entities.Impaye;

import java.util.List;

public interface ImpayeService {
    public List<Impaye> getImpayesByFacture(Long numFacture);
}
