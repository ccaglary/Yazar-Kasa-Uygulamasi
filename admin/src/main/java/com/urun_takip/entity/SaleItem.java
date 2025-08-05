package com.urun_takip.entity;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaleItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "sale_id", nullable = false)
	private Sale sale;

	private String productName;

	private BigDecimal quantity; // Hem 2 (adet) hem de 1.750 (kg) gibi değerleri tutabilir

	private BigDecimal priceAtTimeOfSale; // Satış anındaki BİRİM fiyat (1 adet veya 1 kg fiyatı)

}
