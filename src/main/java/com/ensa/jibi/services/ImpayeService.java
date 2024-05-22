package com.ensa.jibi.services;

import com.ensa.jibi.domain.entities.Impaye;

import java.util.List;

public interface ImpayeService {
    public List<Impaye> getImpayesByFacture(Long factureId);
}
