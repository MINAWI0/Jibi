package com.ensa.jibi.backend.services;

import com.ensa.jibi.backend.domain.dto.AgentDto;
import com.ensa.jibi.backend.domain.entities.Agent;
import com.ensa.jibi.backend.domain.entities.Role;
import com.ensa.jibi.backend.domain.requests.LoginRequest;
import com.ensa.jibi.backend.exceptions.PhoneNumberException;
import com.ensa.jibi.backend.mappers.AgentMapper;
import com.ensa.jibi.backend.repositories.AgentRepository;
import com.ensa.jibi.backend.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;

import static java.util.Arrays.*;

@Service
public class AgentService {
    private final AgentRepository agentRepository;
    private final AgentMapper agentMapper;
    private final OTPService otpService;
    private final PasswordEncoder passwordEncoder;
    private final RoleService roleService;

    @Autowired
    public AgentService(AgentRepository agentRepository, AgentMapper agentMapper, OTPService otpService, PasswordEncoder passwordEncoder, RoleService roleService) {
        this.agentRepository = agentRepository;
        this.agentMapper = agentMapper;
        this.otpService = otpService;
        this.passwordEncoder = passwordEncoder;
        this.roleService = roleService;
    }

    public AgentDto save(AgentDto agentDto) {
     String agentPhoneNumber = agentDto.getNumTel();
        if (agentRepository.existsByNumTel(agentPhoneNumber)) {
            throw new PhoneNumberException("Phone number " + agentPhoneNumber + " already exists.");
        }
        Role agentRole = roleService.findByName("ROLE_AGENT");
        agentDto.setPassword(passwordEncoder.encode(otpService.sendOTP(agentDto.getNumTel())));
        Agent agent = agentMapper.mapFrom(agentDto);
        agent.setRoles(asList(agentRole));
        return agentMapper.mapTo(agentRepository.save(agent));
    }

    public AgentDto getUserByUsernameAndPassword(LoginRequest loginRequest){
    Agent agent = agentRepository.
            findByUsernameAndPassword(loginRequest.getUsername(),
                    loginRequest.getPassword());
        return agentMapper.mapTo(agent);
    }

}
