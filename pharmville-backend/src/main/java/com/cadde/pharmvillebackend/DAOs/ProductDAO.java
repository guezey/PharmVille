package com.cadde.pharmvillebackend.DAOs;

import com.cadde.pharmvillebackend.DAOs.row_mappers.ProductRowMapper;
import com.cadde.pharmvillebackend.dtos.ProductDto;
import com.cadde.pharmvillebackend.models.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.SQLDataException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Repository
public class ProductDAO {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ProductDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Product> getProducts() {

        String query = """
            SELECT *
                FROM product
        """;

        return jdbcTemplate.query(query,new ProductRowMapper());
    }

    public Optional<Product> getProductById(Integer id) {
        String query = """
                SELECT *
                    FROM product
                    WHERE id = ?;
                """;
        return jdbcTemplate.query(query, new ProductRowMapper(), id)
                .stream().findFirst();

    }

    public int saveOrUpdate(Product product){
        if (product.getId() == null &&
                this.getProductById(product.getId()).isEmpty())
            return insert(product);
        else return update(product);
    }


    private int update(Product product) {
        String query = """
            UPDATE product 
                SET name = ?, company = ?, image_path = ?
                WHERE id = ?;
                """;
        return jdbcTemplate.update(query, product.getName(),
                product.getCompany(), product.getImageUrl(), product.getId() );

    }

    private int insert(Product product) {
        String query = """
            INSERT INTO product (name, company, image_path)                 
                VALUES (?, ?, ?) 
            """;
        return jdbcTemplate.update(query, product.getName(),
                product.getCompany(), product.getImageUrl());
    }


}
