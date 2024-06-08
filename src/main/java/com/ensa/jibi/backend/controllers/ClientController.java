package com.ensa.jibi.backend.controllers;

import com.ensa.jibi.backend.domain.dto.ClientDto;
import com.ensa.jibi.backend.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clients")
public class ClientController {

    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_AGENT')")
    public ResponseEntity<?> addClient(@RequestBody ClientDto clientDto) {
        return clientService.addClient(clientDto);
    }

    @PutMapping("/{id}/update")
    public ClientDto updateClient(@PathVariable Long id, @RequestBody ClientDto clientDto) {
        return clientService.updateClient(id, clientDto);
    }

    @DeleteMapping("/{id}/delete")
    public void deleteClient(@PathVariable Long id) {
        clientService.deleteClient(id);
    }

    @GetMapping("/{id}/details")
    public ClientDto getClientById(@PathVariable Long id) {
        return clientService.getClientById(id);
    }

    @GetMapping("/list")
    public List<ClientDto> getAllClients() {
        return clientService.getAllClients();
    }
}
