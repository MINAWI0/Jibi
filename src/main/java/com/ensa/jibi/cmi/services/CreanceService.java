package com.ensa.jibi.cmi.services;

import com.ensa.jibi.cmi.domain.dto.creanceDto.CreanceDto;

import java.util.List;

public interface CreanceService {
    List<CreanceDto> getAllCreances();
    CreanceDto getCreance(Long id);
    CreanceDto createCreance(CreanceDto creanceDto);
    CreanceDto updateCreance(Long id, CreanceDto creanceDto);
    void deleteCreance(Long id);
}
