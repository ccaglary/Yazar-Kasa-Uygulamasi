package com.urun_takip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.urun_takip.entity.Sale;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {

}
