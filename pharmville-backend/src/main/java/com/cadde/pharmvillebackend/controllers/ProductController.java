package com.cadde.pharmvillebackend.controllers;

import com.cadde.pharmvillebackend.dtos.ProductDto;
import com.cadde.pharmvillebackend.mappers.ProductMapper;
import com.cadde.pharmvillebackend.models.Product;
import com.cadde.pharmvillebackend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/{productId}")
    ResponseEntity<ProductDto> getProductById(@PathVariable Integer productId) {
        ProductDto productDto = productService.getProductById(productId);

        return new ResponseEntity<ProductDto>(productDto, HttpStatus.OK);
    }

    @GetMapping()
    ResponseEntity<List<ProductDto>> getProductById() {
        List<ProductDto> productDtos = productService.getProducts();

        return new ResponseEntity<>(productDtos, HttpStatus.OK);
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.OK)
    void addProduct(@RequestBody ProductDto productDto) {
        productService.addProduct(productDto);
    }

}
