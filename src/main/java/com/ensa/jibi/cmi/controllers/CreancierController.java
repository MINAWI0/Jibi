package com.ensa.jibi.cmi.controllers;

import com.ensa.jibi.cmi.domain.entities.Creancier;
import com.ensa.jibi.cmi.domain.entities.creance.Creance;
import com.ensa.jibi.cmi.domain.entities.creance.Recharge;
import com.ensa.jibi.cmi.domain.enums.RechargeAmmount;
import com.ensa.jibi.cmi.repositories.CreanceRepository;
import com.ensa.jibi.cmi.services.impl.CreancierServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/creanciers")

public class CreancierController {
    @Autowired
    private CreancierServiceImpl creancierService;

    @Autowired
    private CreanceRepository creanceRepository;
    @GetMapping({"/{id}"})
    public Creancier getCreancier(@PathVariable("id") Long id) {
        return creancierService.getCreancier(id);
    }
    @GetMapping
    public List<Creancier> getCreancier() {
        return creancierService.getAllCreanciers();
    }


}
