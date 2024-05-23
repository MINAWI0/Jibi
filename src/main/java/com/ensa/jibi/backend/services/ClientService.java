package com.ensa.jibi.backend.services;

import com.ensa.jibi.backend.domain.dto.ClientDto;
import com.ensa.jibi.backend.domain.entities.Client;

import java.util.List;

public interface ClientService {
    ClientDto addClient(ClientDto clientDto);
    ClientDto updateClient(Long id, ClientDto clientDto);
    void deleteClient(Long id);
    ClientDto getClientById(Long id);
    List<ClientDto> getAllClients();
}
