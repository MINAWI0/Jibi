package com.ensa.jibi.services;

import com.ensa.jibi.domain.entities.Creancier;

import java.util.List;

public interface CreancierService {
    public List<Creancier> getAllCreanciers();

    public Object getCreancier(Long id);
    public List<Creancier> getCreanciersByCategorie(String categorie);
}
