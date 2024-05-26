package com.ensa.jibi.cmi.services;

import com.ensa.jibi.cmi.domain.entities.Creancier;

import java.util.List;

public interface CreancierService {
    public List<Creancier> getAllCreanciers();

    public Object getCreancier(Long id);
}
