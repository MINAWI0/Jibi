package com.ensa.jibi.backend.services.impl;

import com.ensa.jibi.backend.domain.dto.ClientDto;
import com.ensa.jibi.backend.domain.entities.Client;
import com.ensa.jibi.backend.mappers.ClientMapper;
import com.ensa.jibi.backend.repositories.ClientRepository;
import com.ensa.jibi.backend.services.ClientService;
import com.ensa.jibi.cmi.domain.dto.ComptePaiementDto;
import com.ensa.jibi.cmi.services.impl.ComptePaiementServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;
    private final ComptePaiementServiceImpl comptePaiementService;

    @Autowired
    public ClientServiceImpl(ClientRepository clientRepository, ClientMapper clientMapper, ComptePaiementServiceImpl comptePaiementService) {
        this.clientRepository = clientRepository;
        this.clientMapper = clientMapper;
        this.comptePaiementService = comptePaiementService;
    }

    @Override
    public ClientDto addClient(ClientDto clientDto) {
        String phoneNumber = clientDto.getNumTel();
        if (comptePaiementService.existsById(phoneNumber)) {
            throw new IllegalArgumentException("Phone number already exists as ComptePaiement ID");
        }

        Client client = clientMapper.mapFrom(clientDto);
        client = clientRepository.save(client);

        // Create a new ComptePaiement with the ID = phone number
        ComptePaiementDto comptePaiement = new ComptePaiementDto();
        comptePaiement.setId(phoneNumber);
        comptePaiement.setSolde(0.0); // Initialize solde
        comptePaiementService.save(comptePaiement);
        return clientMapper.mapTo(client);
    }

    @Override
    public ClientDto updateClient(Long id, ClientDto clientDto) {
        Optional<Client> existingClientOpt = clientRepository.findById(id);
        if (existingClientOpt.isPresent()) {
            Client existingClient = existingClientOpt.get();

            // Update basic fields
            existingClient.setEmail(clientDto.getEmail());
            existingClient.setNumTel(clientDto.getNumTel());
            existingClient.setClientType(clientDto.getClientType());

            Client updatedClient = clientRepository.save(existingClient);
            return clientMapper.mapTo(updatedClient);
        } else {
            throw new RuntimeException("Client not found");
        }
    }

    @Override
    public void deleteClient(Long id) {
        Optional<Client> clientOpt = clientRepository.findById(id);
        if (clientOpt.isPresent()) {
            Client client = clientOpt.get();
            String phoneNumber = client.getNumTel();

            clientRepository.deleteById(id);

            comptePaiementService.delete(phoneNumber);
        } else {
            throw new RuntimeException("Client not found");
        }
    }

    @Override
    public ClientDto getClientById(Long id) {
        return clientRepository.findById(id)
                .map(clientMapper::mapTo)
                .orElseThrow(() -> new RuntimeException("Client not found"));
    }

    @Override
    public List<ClientDto> getAllClients() {
        return clientRepository.findAll()
                .stream()
                .map(clientMapper::mapTo)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteByNumTel(String id) {
        clientRepository.deleteByNumTel(id);
    }
}
