package com.cadde.pharmvillebackend.models;

import lombok.Data;

@Data
public class Product {
    private Integer id;
    private String name;
    private String company;
    private String imageUrl;

    //TODO: join with pharmacy
    //TODO: join with order

}
