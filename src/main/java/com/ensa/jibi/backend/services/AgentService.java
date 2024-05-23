package com.ensa.jibi.backend.services;

import com.ensa.jibi.backend.domain.dto.AgentDto;
import com.ensa.jibi.backend.domain.entities.Agent;
import com.ensa.jibi.backend.domain.requests.LoginRequest;
import com.ensa.jibi.backend.exceptions.PhoneNumberException;
import com.ensa.jibi.backend.mappers.AgentMapper;
import com.ensa.jibi.backend.repositories.AgentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AgentService {
    private final AgentRepository agentRepository;
    private final AgentMapper agentMapper;
    private final OTPService otpService;

    @Autowired
    public AgentService(AgentRepository agentRepository, AgentMapper agentMapper, OTPService otpService) {
        this.agentRepository = agentRepository;
        this.agentMapper = agentMapper;
        this.otpService = otpService;
    }

    public Agent save(AgentDto agentDto) {
        String agentPhoneNumber = agentDto.getNumTel();

        if (agentRepository.existsByNumTel(agentPhoneNumber)) {
            throw new PhoneNumberException("Phone number " + agentPhoneNumber + " already exists.");
        }
        try {
            agentDto.setPassword(otpService.sendOTP(agentDto.getNumTel()));
            return agentRepository.save(agentMapper.mapFrom(agentDto));
        } catch (Exception e) {
            throw new PhoneNumberException("Phone number " + agentDto.getNumTel() + " invalid.");
        }

    }
    public AgentDto getUserByUsernameAndPassword(LoginRequest loginRequest){
    Agent agent = agentRepository.
            findByUsernameAndPassword(loginRequest.getUsername(),
                    loginRequest.getPassword());
        return agentMapper.mapTo(agent);
    }

}
