package Dto;

import java.math.BigDecimal;

import com.urun_takip.enums.ProductType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDto {

	private Long id; // Ürünün ID'si
	private String name;
	private BigDecimal quantity;
	private BigDecimal price; // Satış anındaki birim fiyat
	private ProductType productType;
	private BigDecimal totalItemPrice; // O kalem için toplam fiyat
}
