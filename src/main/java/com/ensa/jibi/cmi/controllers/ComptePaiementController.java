package com.ensa.jibi.cmi.controllers;

import com.ensa.jibi.cmi.domain.dto.ComptePaiementDto;
import com.ensa.jibi.cmi.domain.entities.ComptePaiement;
import com.ensa.jibi.cmi.repositories.ComptePaiementRepository;
import com.ensa.jibi.cmi.services.ComptePaimentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comptes")
public class ComptePaiementController {

    @Autowired
    private ComptePaimentService comptePaiementService;
    @Autowired
    private ComptePaiementRepository comptePaiementRepository;


    @PostMapping
    public ResponseEntity<ComptePaiementDto> createCompte(@RequestBody ComptePaiementDto comptePaiementDto) {
        ComptePaiementDto savedCompte = comptePaiementService.save(comptePaiementDto);
        return new ResponseEntity<>(savedCompte, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ComptePaiement>> getAllComptes() {
//        List<ComptePaiementDto> comptes = comptePaiementService.findAll();
//        return new ResponseEntity<>(comptes, HttpStatus.OK);
        return new ResponseEntity<>(comptePaiementRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    //get By Phone Number
    public ResponseEntity<ComptePaiementDto> getCompteById(@PathVariable String id) {
        try {
            ComptePaiementDto compte = comptePaiementService.findOne(id).orElseThrow(() -> new RuntimeException("Compte not found"));
            return new ResponseEntity<>(compte, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ComptePaiementDto> partialUpdateCompte(@PathVariable String id, @RequestBody ComptePaiementDto comptePaiementDto) {
        try {
            ComptePaiementDto updatedCompte = comptePaiementService.partialUpdate(id, comptePaiementDto);
            return new ResponseEntity<>(updatedCompte, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompte(@PathVariable String id) {
        if (comptePaiementService.isExists(id)) {
            comptePaiementService.delete(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
