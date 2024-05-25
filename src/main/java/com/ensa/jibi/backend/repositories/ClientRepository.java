package com.ensa.jibi.backend.repositories;

import com.ensa.jibi.backend.domain.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    // Additional query methods if necessary
}
