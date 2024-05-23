package com.ensa.jibi.backend.mappers;

import com.ensa.jibi.backend.domain.dto.AgentDto;
import com.ensa.jibi.backend.domain.entities.Agent;
import com.ensa.jibi.cmi.mappers.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AgentMapper implements Mapper<Agent, AgentDto> {
    @Autowired
    ModelMapper modelMapper;
    @Override
    public AgentDto mapTo(Agent agent) {
        return modelMapper.map(agent, AgentDto.class);
    }

    @Override
    public Agent mapFrom(AgentDto agentDto) {
        return modelMapper.map(agentDto, Agent.class);
    }
}
