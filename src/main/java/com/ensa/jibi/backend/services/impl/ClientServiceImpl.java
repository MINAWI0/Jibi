package com.ensa.jibi.backend.services.impl;

import com.ensa.jibi.backend.domain.dto.ClientDto;
import com.ensa.jibi.backend.domain.dto.DocumentDto;
import com.ensa.jibi.backend.domain.entities.Client;
import com.ensa.jibi.backend.domain.entities.Document;
import com.ensa.jibi.backend.mappers.ClientMapper;
import com.ensa.jibi.backend.repositories.ClientRepository;
import com.ensa.jibi.backend.services.ClientService;
import org.modelmapper.ModelMapper;
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
    private final ModelMapper modelMapper;

    @Autowired
    public ClientServiceImpl(ClientRepository clientRepository, ClientMapper clientMapper, ModelMapper modelMapper) {
        this.clientRepository = clientRepository;
        this.clientMapper = clientMapper;
        this.modelMapper = modelMapper;
    }

    @Override
    public ClientDto addClient(ClientDto clientDto) {
        Client client = clientMapper.mapFrom(clientDto);
        client = clientRepository.save(client);
        return clientMapper.mapTo(client);
    }

    @Override
    public ClientDto updateClient(Long id, ClientDto clientDto) {
        Optional<Client> existingClientOpt = clientRepository.findById(id);
        //This line checks if the Optional<Client> object retrieved in the previous step has a value.
        if (existingClientOpt.isPresent()) {
            //If the client was found (isPresent() returned true), this line retrieves the actual Client object from the Optional.
            Client existingClient = existingClientOpt.get();

            // Update basic fields
            existingClient.setEmail(clientDto.getEmail());
            existingClient.setNumTel(clientDto.getNumTel());
            existingClient.setClientType(clientDto.getClientType());

//            // Clear the existing documents and add new ones
            // Minaoui : disabling update for doc =  they should be static i guess !!
//            existingClient.getDocuments().clear();
//            List<Document> documents = clientDto.getDocuments().stream()
//                    .map(documentDto -> {
//                        Document document = modelMapper.map(documentDto, Document.class);
//                        document.setClient(existingClient); // Set the client reference
//                        return document;
//                    })
//                    .collect(Collectors.toList());
//            existingClient.getDocuments().addAll(documents);

            Client updatedClient = clientRepository.save(existingClient);
            return clientMapper.mapTo(updatedClient);
        } else {
            throw new RuntimeException("Client not found");
        }
    }

    @Override
    public void deleteClient(Long id) {
        clientRepository.deleteById(id);
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
}
