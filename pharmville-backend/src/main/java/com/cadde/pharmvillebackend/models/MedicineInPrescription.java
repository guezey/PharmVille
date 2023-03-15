package com.cadde.pharmvillebackend.models;

import lombok.Data;

@Data
public class MedicineInPrescription {
    public Medicine medicine;
    public Prescription prescription;
    public String dosage;
}
