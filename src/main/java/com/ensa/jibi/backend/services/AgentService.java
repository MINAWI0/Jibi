package com.ensa.jibi.backend.services;

import com.ensa.jibi.backend.domain.dto.AgentDto;
import com.ensa.jibi.backend.domain.entities.Agent;
import com.ensa.jibi.backend.exceptions.DuplicatePhoneNumberException;
import com.ensa.jibi.backend.mappers.AgentMapper;
import com.ensa.jibi.backend.repositories.AgentRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
public class AgentService {
    private final AgentRepository agentRepository;
    private final AgentMapper agentMapper;
    public AgentService(AgentRepository agentRepository, AgentMapper agentMapper) {
        this.agentRepository = agentRepository;
        this.agentMapper = agentMapper;
    }

    public Agent save(AgentDto agentDto) {
        try {
            return agentRepository.save(agentMapper.mapFrom(agentDto));
        } catch (DataIntegrityViolationException e) {
            throw new DuplicatePhoneNumberException("Phone number " + agentDto.getNumTel() + " already exists.");
        }
    }

}
