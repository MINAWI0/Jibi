package com.ensa.jibi.cmi.controllers;

import com.ensa.jibi.cmi.domain.entities.Impaye;
import com.ensa.jibi.cmi.services.impl.ImpayeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/impayes")
public class ImpayeController {
    @Autowired
    private ImpayeServiceImpl impayeService;

    @GetMapping("/{id}")
    public List<Impaye> getImpayeBuFacture(@PathVariable("id") Long id) {
        return impayeService.getImpayesByFacture(id);
    }
}
