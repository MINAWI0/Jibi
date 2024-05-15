package com.ensa.jibi.repositories;

import com.ensa.jibi.domain.entities.ConfirmationPaiement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ConfirmationPaiementRepository extends JpaRepository<ConfirmationPaiement , Long> {
}
