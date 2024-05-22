package com.ensa.jibi.repositories;

import com.ensa.jibi.domain.entities.ComptePaiement;
import com.ensa.jibi.domain.entities.ConfirmationPaiement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface ConfirmationPaiementRepository extends JpaRepository<ConfirmationPaiement , Long> {
    Optional<ConfirmationPaiement> findByCompte(ComptePaiement compte);
}
