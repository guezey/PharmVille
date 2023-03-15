package com.cadde.pharmvillebackend.models;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

enum PrescriptionType {
    RED, GREEN, PURPLE, ORANGE, NORMAL
}

enum PrescriptionStatus {
    ACTIVE, USED, EXPIRED
}

@Data
public class Prescription {
    private Integer id;
    private LocalDate writeDate;
    private LocalDate dueDate;
    private PrescriptionType prescriptionType;
    private PrescriptionStatus status;

    private List<Disease> diseases;
    //TODO: join to owning patient
    //Todo: join to Writing doctor





}


