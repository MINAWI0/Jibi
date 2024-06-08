package com.ensa.jibi.services.impl;

import com.ensa.jibi.domain.entities.Creancier;
import com.ensa.jibi.repositories.CreancierRepository;
import com.ensa.jibi.services.CreancierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CreancierServiceImpl implements CreancierService {

    @Autowired
    private CreancierRepository creancierRepository;
    @Override
    public List<Creancier> getAllCreanciers(){
        return creancierRepository.findAll();
    }

    public Creancier getCreancier(Long id){
        return creancierRepository.getById(id);
    }
    public List<Creancier> getCreanciersByCategorie(String categorie){ return creancierRepository.findAllByCategorie(categorie);}

}
