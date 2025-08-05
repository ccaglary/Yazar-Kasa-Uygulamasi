package Dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.Data;

@Data
public class CartDto {

	private List<CartItemDto> cart;
	private BigDecimal totalPrice;
}
