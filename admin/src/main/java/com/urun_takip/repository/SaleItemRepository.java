package com.urun_takip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.urun_takip.entity.SaleItem;

@Repository
public interface SaleItemRepository extends JpaRepository<SaleItem, Long>{

}
