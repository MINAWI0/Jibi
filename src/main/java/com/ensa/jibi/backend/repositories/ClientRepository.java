package com.ensa.jibi.backend.repositories;

import com.ensa.jibi.backend.domain.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
void deleteByNumTel(String numTel);

Optional<Client> findByNumTel(String numTel);
}
