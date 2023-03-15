package com.cadde.pharmvillebackend.models;

import lombok.Data;

@Data
public class Product {
    private Integer Id;
    private String name;
    private String company;
    private String imageUrl;

    //TODO: joing with pharmacy
    //TODO: join with order

}
