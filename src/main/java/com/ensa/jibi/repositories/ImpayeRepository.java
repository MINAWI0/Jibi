package com.ensa.jibi.repositories;

import com.ensa.jibi.domain.entities.Impaye;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ImpayeRepository extends JpaRepository<Impaye ,  Long> {
}
