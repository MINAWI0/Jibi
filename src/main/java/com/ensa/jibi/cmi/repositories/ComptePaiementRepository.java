package com.ensa.jibi.cmi.repositories;

import com.ensa.jibi.cmi.domain.entities.ComptePaiement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComptePaiementRepository extends JpaRepository<ComptePaiement, String> {
}
