package com.ensa.jibi.backend.services.impl;

import com.ensa.jibi.backend.domain.dto.ClientDto;
import com.ensa.jibi.backend.domain.entities.Agent;
import com.ensa.jibi.backend.domain.entities.Client;
import com.ensa.jibi.backend.domain.entities.Role;
import com.ensa.jibi.backend.domain.requests.LoginRequest;
import com.ensa.jibi.backend.mappers.ClientMapper;
import com.ensa.jibi.backend.repositories.ClientRepository;
import com.ensa.jibi.backend.services.ClientService;
import com.ensa.jibi.backend.services.OTPService;
import com.ensa.jibi.backend.services.RoleService;
import com.ensa.jibi.cmi.domain.dto.ComptePaiementDto;
import com.ensa.jibi.cmi.services.impl.ComptePaiementServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.util.Arrays.asList;

@Service
@Transactional
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;
    private final ComptePaiementServiceImpl comptePaiementService;
    private final PasswordEncoder passwordEncoder;
    private final RoleService roleService;
    private final OTPService otpService;

    @Autowired
    public ClientServiceImpl(ClientRepository clientRepository, ClientMapper clientMapper, ComptePaiementServiceImpl comptePaiementService, PasswordEncoder passwordEncoder, RoleService roleService, OTPService otpService) {
        this.clientRepository = clientRepository;
        this.clientMapper = clientMapper;
        this.comptePaiementService = comptePaiementService;
        this.passwordEncoder = passwordEncoder;
        this.roleService = roleService;
        this.otpService = otpService;
    }

    @Override
    //TODO:: add sending otp (copy it from agent dto)
    public ClientDto addClient(ClientDto clientDto) {
        String phoneNumber = clientDto.getNumTel();
        Role clientRole = roleService.findByName("ROLE_USER");
        if (comptePaiementService.existsById(phoneNumber)) {
            throw new IllegalArgumentException("Phone number already exists as ComptePaiement ID");
        }

        Client client = clientMapper.mapFrom(clientDto);
        client.setPassword(passwordEncoder.encode(otpService.sendOTP(clientDto.getNumTel())));
        client.setRoles(asList(clientRole));
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

    public ClientDto getClientByUsernameAndPassword(LoginRequest loginRequest) {
        return clientMapper.mapTo(clientRepository.findByUsernameAndPassword(loginRequest.getUsername(), loginRequest.getPassword()));
    }
}
