package com.ensa.jibi.controllers;

import com.ensa.jibi.domain.dto.ComptePaiementDto;
import com.ensa.jibi.domain.dto.ConfirmationPaiementDto;
import com.ensa.jibi.domain.entities.ConfirmationPaiement;
import com.ensa.jibi.services.ConfirmationPaiementService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/confirmation")
public class ConfirmationPaiementController {
    private final ConfirmationPaiementService confirmationPaiementService;

    // hna c est du injection de dep avec constructure   :::   eviter d utilser @autowired ,que je pense c est depracted !!! (Minaoui)
    public ConfirmationPaiementController(ConfirmationPaiementService confirmationPaiementService) {
        this.confirmationPaiementService = confirmationPaiementService;
    }



    // hna j essayer d avoir tout le confiarmation de paiment en raison de histrique
    @GetMapping("/all_confirmations")
    public ResponseEntity<List<ConfirmationPaiement>> getAllConfirmations() {
        List<ConfirmationPaiement> confirmations = confirmationPaiementService.getAllConfirmations();
        return ResponseEntity.ok(confirmations);
    }



    // hna je sais pas wach hadchi s7i7 !  comment en peut avoir
    @GetMapping("/")
    public ResponseEntity<ConfirmationPaiement> getConfirmationById(@RequestBody ComptePaiementDto comptePaiementDto) {
        Optional<ConfirmationPaiement> confirmation = confirmationPaiementService.getConfirmationByCompte(comptePaiementDto);
        return confirmation.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ConfirmationPaiement> createConfirmation(@RequestBody ConfirmationPaiement confirmationPaiement) {
        ConfirmationPaiement createdConfirmation = confirmationPaiementService.createConfirmation(confirmationPaiement);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdConfirmation);
    }
}