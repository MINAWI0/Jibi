package com.ensa.jibi.repositories;

import com.ensa.jibi.domain.entities.ComptePaiement;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComptePaiementRepository extends CrudRepository<ComptePaiement, String> {
}
