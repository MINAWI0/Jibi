package com.ensa.jibi.repositories;

import com.ensa.jibi.domain.entities.Impaye;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ImpayeRepository extends JpaRepository<Impaye,Long> {
    @Query("SELECT i FROM Impaye i WHERE i.creance.id = :creanceId")
    List<Impaye> findByCreanceId(@Param("creanceId") Long creanceId);
}
