package com.ensa.jibi.cmi.services.impl;

import com.ensa.jibi.cmi.domain.entities.Creancier;
import com.ensa.jibi.cmi.repositories.CreancierRepository;
import com.ensa.jibi.cmi.services.CreancierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
