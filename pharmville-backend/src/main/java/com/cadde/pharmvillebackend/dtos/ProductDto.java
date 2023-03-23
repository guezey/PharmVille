package com.cadde.pharmvillebackend.dtos;


import lombok.Data;

@Data
public class ProductDto {
    public Integer Id;
    public String name;
    public String company;
    public String imageUrl;
}
