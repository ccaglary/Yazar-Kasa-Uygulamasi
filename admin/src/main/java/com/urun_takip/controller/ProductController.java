package com.urun_takip.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.urun_takip.entity.Product;
import com.urun_takip.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/products")
public class ProductController {

	private final ProductRepository productRepository;

	@GetMapping
	public ResponseEntity<List<Product>> getAllProducts() {
		List<Product> products = productRepository.findAll();
		return ResponseEntity.ok(products);
	}

	 @GetMapping("/barcode/{barcode}")
	    public ResponseEntity<Product> getProductByBarcode(@PathVariable String barcode) {
	        return productRepository.findByBarcode(barcode)
	                .map(ResponseEntity::ok) // Ürün bulunduysa 200 OK ile ürünü döndür
	                .orElse(ResponseEntity.notFound().build()); // Bulunamadıysa 404 Not Found döndür
	    }

	@PostMapping
	public Product addProduct(@RequestBody Product product) {
		return productRepository.save(product);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
		return productRepository.findById(id).map(product -> {
			product.setName(productDetails.getName());
			product.setBarcode(productDetails.getBarcode());
			product.setPrice(productDetails.getPrice());
			product.setCategory(productDetails.getCategory());
			Product updatedProduct = productRepository.save(product);
			return ResponseEntity.ok(updatedProduct);
		}).orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
		return productRepository.findById(id).map(product -> {
			productRepository.delete(product);
			return ResponseEntity.ok().build();
		}).orElse(ResponseEntity.notFound().build());
	}

}
