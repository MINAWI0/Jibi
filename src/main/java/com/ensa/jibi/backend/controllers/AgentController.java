package com.ensa.jibi.backend.controllers;

import com.ensa.jibi.backend.domain.dto.AgentDto;
import com.ensa.jibi.backend.domain.entities.Agent;
import com.ensa.jibi.backend.services.AgentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/agents")
public class AgentController {

    private final AgentService agentService;

    @Autowired
    public AgentController(AgentService agentService) {
        this.agentService = agentService;
    }

    @PostMapping
    public ResponseEntity<AgentDto> saveAgent(@RequestBody AgentDto agentDto) {
        AgentDto savedAgent = agentService.save(agentDto);
        return ResponseEntity.ok(savedAgent);
    }

}
