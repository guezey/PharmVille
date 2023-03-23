package com.cadde.pharmvillebackend.DAOs.row_mappers;

import com.cadde.pharmvillebackend.models.Product;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ProductRowMapper implements RowMapper<Product> {
    @Override
    public Product mapRow(ResultSet rs, int rowNum) throws SQLException {
        Product product = new Product();

        product.setId(rs.getInt("id"));
        product.setName(rs.getString("name"));
        product.setCompany(rs.getString("company"));
        product.setImageUrl(rs.getString("image_path"));

        return product;
    }
}
