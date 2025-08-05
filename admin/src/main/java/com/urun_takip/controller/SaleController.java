package com.urun_takip.controller;

import java.math.BigDecimal;
import java.security.PrivateKey;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.urun_takip.entity.Product;
import com.urun_takip.entity.Sale;
import com.urun_takip.entity.SaleItem;
import com.urun_takip.enums.ProductType;
import com.urun_takip.repository.ProductRepository;
import com.urun_takip.repository.SaleRepository;
import com.urun_takip.service.SaleService;

import Dto.CartDto;
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sales")
public class SaleController {
	
	 private final SaleService saleService;

	    // Frontend'den tüm sepeti tek seferde alan DTO
	    @PostMapping("/checkout")
	    public ResponseEntity<Sale> createSale(@RequestBody CartDto cartDto) {
	        Sale savedSale = saleService.createSaleFromCart(cartDto);
	        return ResponseEntity.ok(savedSale);
	    }
}
