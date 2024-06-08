package com.ensa.jibi.controllers;

import com.ensa.jibi.domain.entities.Creancier;
import com.ensa.jibi.domain.entities.creance.Creance;
import com.ensa.jibi.domain.entities.creance.Recharge;
import com.ensa.jibi.domain.enums.RechargeAmmount;
import com.ensa.jibi.repositories.CreanceRepository;
import com.ensa.jibi.services.impl.CreancierServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cmi/creanciers")
@CrossOrigin(origins = "http://localhost:4200")

public class CreancierController {
    @Autowired
    private CreancierServiceImpl creancierService;


    @GetMapping
    public List<Creancier> getCreaciers() {
        return creancierService.getAllCreanciers();
    }

    @GetMapping("/{categorie}")
    public List<Creancier> getCreanciersByCategorie(@PathVariable("categorie") String categorie) {
        return creancierService.getCreanciersByCategorie(categorie);
    }

}
