package com.ensa.jibi.cmi.services.impl;

import com.ensa.jibi.cmi.domain.dto.creanceDto.CreanceDto;
import com.ensa.jibi.cmi.domain.entities.creance.Creance;
import com.ensa.jibi.cmi.mappers.impl.CreanceMapper;
import com.ensa.jibi.cmi.mappers.impl.CreancierMapperImpl;
import com.ensa.jibi.cmi.repositories.CreanceRepository;
import com.ensa.jibi.cmi.repositories.CreancierRepository;
import com.ensa.jibi.cmi.services.CreanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CreanceServiceImpl implements CreanceService {
    @Autowired
    private CreanceRepository creanceRepository;
    @Autowired
    private CreanceMapper creanceMapper;
    @Autowired
    private CreancierRepository creancierRepository;
    @Autowired
    private CreancierMapperImpl creancierMapper;

    @Override
    public List<CreanceDto> getAllCreances(){
        return creanceRepository.findAll().stream()
                .map(creance -> creanceMapper.mapTo(creance)).collect(Collectors.toList());
    }

    @Override
    public CreanceDto getCreance(Long id){
        Optional<Creance> creance = creanceRepository.findById(id);
        return creance.map(creanceMapper::mapTo).orElse(null);
    }

    @Override
    public CreanceDto createCreance(CreanceDto creanceDto){
        Long creancierId = creanceDto.getCreancier().getId();
        boolean creancierExists = creancierRepository.existsById(creancierId);

        if (creancierExists) {
            Creance creance = creanceMapper.mapFrom(creanceDto);
            creance.setCreancier(creancierRepository.
                    findById(creancierId).
                    get());
            Creance savedCreance = creanceRepository.save(creance);
            return creanceMapper.mapTo(savedCreance);
        } else {
            throw new IllegalArgumentException("Creancier does not exist");
        }
    }

    @Override
    public CreanceDto updateCreance(Long id, CreanceDto creanceDto){
        if(creanceRepository.existsById(id)){
            Creance creance = creanceMapper.mapFrom(creanceDto);
            creance.setId(id);
            Creance updatedCreance = creanceRepository.save(creance);
            return creanceMapper.mapTo(updatedCreance);
        }
        return null;
    }

    @Override
    public void deleteCreance(Long id){
        creanceRepository.deleteById(id);
    }
}
