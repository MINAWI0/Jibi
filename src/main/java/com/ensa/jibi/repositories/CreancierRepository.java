package com.ensa.jibi.repositories;

import com.ensa.jibi.domain.entities.Creancier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CreancierRepository extends JpaRepository<Creancier,Long> {
}
