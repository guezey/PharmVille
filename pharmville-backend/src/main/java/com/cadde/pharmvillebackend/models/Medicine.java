package com.cadde.pharmvillebackend.models;

import lombok.Data;

import java.util.List;


enum IntakeType {
    PILL, TABLET , IN_WATER,
}

@Data
public class Medicine extends Product {
    private int lowestAge;
    private int highestAge;
    private PrescriptionType prescType;
    private String prospectus;
    private IntakeType intakeType;

    private SideEffect sideEffects;
    private List<Disease> conflictingDiseases;
    private List<Disease>  curesDiseases;
    private List<MedicineInPrescription> prescriptions;


}
