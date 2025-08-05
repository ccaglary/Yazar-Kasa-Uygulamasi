package com.urun_takip.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.urun_takip.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

	Optional<Product> findByBarcode(String barcode);

	Optional<Product> findById(Long id);

}
