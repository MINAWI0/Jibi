package com.ensa.jibi.controllers;

import com.ensa.jibi.domain.entities.Creancier;
import com.ensa.jibi.domain.entities.creance.Creance;
import com.ensa.jibi.domain.entities.creance.Recharge;
import com.ensa.jibi.domain.enums.RechargeAmmount;
import com.ensa.jibi.repositories.CreanceRepository;
import com.ensa.jibi.services.impl.CreancierServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cmi/creanciers")

public class CreancierController {
    @Autowired
    private CreancierServiceImpl creancierService;

    @Autowired
    private CreanceRepository creanceRepository;
    @GetMapping({"/{id}"})
    public List<Creancier> getCreaciers(@PathVariable("id") Long id) {
        return creancierService.getAllCreanciers();
    }


}
