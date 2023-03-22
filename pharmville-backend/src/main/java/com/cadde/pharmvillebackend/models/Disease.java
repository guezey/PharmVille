package com.cadde.pharmvillebackend.models;

import lombok.Data;

import java.util.List;


@Data
public class Disease {
    private Integer id;
    private String name;
    private String description;

    private List<String> diseaseTypes;


    private List<Prescription> prescription;
    //TODO: add patients
    private List<Medicine> conflictingMedicine;
    private List<Medicine> curingMedicine;
}
