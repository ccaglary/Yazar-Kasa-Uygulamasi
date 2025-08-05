package com.urun_takip.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.urun_takip.entity.Sale;
import com.urun_takip.entity.SaleItem;
import com.urun_takip.repository.SaleRepository;

import Dto.CartDto;
import Dto.CartItemDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SaleService {

    private final SaleRepository saleRepository;
    // SaleItemRepository artık direkt kullanılmıyor çünkü Cascade ile hallediyoruz.

    @Transactional 
    public Sale createSaleFromCart(CartDto cartDto) {
        
        Sale sale = new Sale();
        sale.setSaleTime(LocalDateTime.now()); // Satış anını şimdi olarak ayarla
        sale.setTotalPrice(cartDto.getTotalPrice()); // Toplam tutarı DTO'dan al

        for (CartItemDto itemDto : cartDto.getCart()) {
            SaleItem saleItem = new SaleItem();
            saleItem.setProductName(itemDto.getName());
            saleItem.setQuantity(itemDto.getQuantity());
            saleItem.setPriceAtTimeOfSale(itemDto.getPrice());
            
            saleItem.setSale(sale); // Bu satır, veritabanında sale_id'nin dolmasını sağlar
            sale.getItems().add(saleItem);

            // Opsiyonel: Stok güncelleme mantığı burada yapılabilir
            // Product product = productRepository.findById(itemDto.getId()).orElse(null);
            // if (product != null && product.getType() != ProductType.MANAV) {
            //    product.setStock(product.getStock() - itemDto.getQuantity().intValue());
            //    productRepository.save(product);
            // }
        }

        return saleRepository.save(sale);
    }
}