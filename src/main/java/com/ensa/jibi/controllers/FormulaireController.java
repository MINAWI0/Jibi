package com.ensa.jibi.controllers;

import com.ensa.jibi.services.FormulaireService;
import com.ensa.jibi.services.impl.FormulaireServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/formulaire")
public class FormulaireController {
    @Autowired
    private FormulaireServiceImpl formulaireService;

    @GetMapping("/{type}")
    public Object getFormulaire(@PathVariable String type) {
        return formulaireService.getFormulaireByCReance(type);
    }
}
