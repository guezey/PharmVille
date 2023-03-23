package com.cadde.pharmvillebackend.services;

import com.cadde.pharmvillebackend.DAOs.ProductDAO;
import com.cadde.pharmvillebackend.dtos.ProductDto;
import com.cadde.pharmvillebackend.exceptions.EntityNotFoundException;
import com.cadde.pharmvillebackend.mappers.ProductMapper;
import com.cadde.pharmvillebackend.models.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductDAO productDAO;
    private final ProductMapper mapper;

    @Autowired
    public ProductService(ProductDAO productDAO, ProductMapper mapper) {
        this.productDAO = productDAO;
        this.mapper = mapper;
    }

    public ProductDto getProductById(Integer productId) {
       Optional<Product> optional = productDAO.getProductById(productId);
       if(optional.isEmpty())
           throw new EntityNotFoundException("Product with id " + productId + " not found");

       return mapper.productToDto(optional.get());
    }

    public List<ProductDto> getProducts() {
        List<Product> products = productDAO.getProducts();

        return mapper.productToDtoList(products);
    }

    public void addProduct(ProductDto productDto) {
        Product product = mapper.dtoToProduct(productDto);

         if (productDAO.saveOrUpdate(product) <= 0)
             throw  new RuntimeException("Failed to operate");
    }
}
