package com.ensa.jibi.mappers.impl;

import com.ensa.jibi.domain.dto.ComptePaiementDto;
import com.ensa.jibi.domain.entities.ComptePaiement;
import com.ensa.jibi.mappers.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ComptePaiementMapperImpl implements Mapper<ComptePaiement, ComptePaiementDto> {

    private final ModelMapper modelMapper;

    public ComptePaiementMapperImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public ComptePaiementDto mapTo(ComptePaiement comptePaiement) {
        return modelMapper.map(comptePaiement, ComptePaiementDto.class);
    }

    @Override
    public ComptePaiement mapFrom(ComptePaiementDto comptePaiementDto) {
        return modelMapper.map(comptePaiementDto, ComptePaiement.class);
    }





}
