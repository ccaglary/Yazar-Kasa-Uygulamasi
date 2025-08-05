package com.urun_takip.entity;

import java.math.BigDecimal;

import com.urun_takip.enums.ProductType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Product {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // <-- ASIL KİMLİK BU OLMALI

    @Column(unique = true) // Barkod eşsiz olsun ama null olabilir
    private String barcode;
    
	private String name;
	
	private BigDecimal price;
	
//	@Enumerated(EnumType.STRING)
//	private ProductType type;
	
	private String category;
	
	 private String unit;
	
}
