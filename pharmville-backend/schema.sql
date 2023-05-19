-- CREATE CODES ---------------------------------------------------------------------
CREATE TABLE User
(
    user_id  int PRIMARY KEY AUTO_INCREMENT,
    email    varchar(255) NOT NULL,
    password char(60)     NOT NULL,
    phone    VARCHAR(10)
);

CREATE TABLE Person
(
    person_id int PRIMARY KEY NOT NULL,
    name      varchar(255),
    surname   varchar(255),
    tck       int(11) NOT NULL,
    is_admin  boolean         NOT NULL,
    FOREIGN KEY (person_id) REFERENCES User (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE Patient
(
    patient_id int PRIMARY KEY,
    birth_date date,
    weight     float,
    height     int,
    gender     char(1),
    FOREIGN KEY (patient_id) REFERENCES Person (person_id)
);

CREATE TABLE Doctor
(
    doctor_id       int PRIMARY KEY NOT NULL,
    speciality      varchar(255),
    approval_status ENUM('APPROVED','REJECTED','PENDING') NOT NULL,
    FOREIGN KEY (doctor_id) REFERENCES Person (person_id)
);

CREATE TABLE Pharmacy
(
    pharmacy_id     int PRIMARY KEY NOT NULL,
    name            varchar(255)    NOT NULL,
    is_on_duty      boolean         NOT NULL,
    diploma_path    text            NOT NULL,
    balance         decimal(10, 2)  NOT NULL,
    approval_status ENUM('APPROVED','REJECTED','PENDING') NOT NULL,
    FOREIGN KEY (pharmacy_id) REFERENCES User (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Prescription
(
    presc_id   int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    doctor_id  int      NOT NULL,
    patient_id int      NOT NULL,
    write_date datetime NOT NULL,
    due_date   datetime NOT NULL,
    type       enum('WHITE', 'RED', 'GREEN', 'ORANGE', 'PURPLE', 'NONE') DEFAULT 'NONE',
    status     enum('ACTIVE', 'USED', 'OVERDUE'),
    FOREIGN KEY (doctor_id) REFERENCES Doctor (doctor_id),
    FOREIGN KEY (patient_id) REFERENCES Patient (patient_id)
);


create table MedicineType
(
    medicine_type varchar(255) NOT NULL,
    primary key (medicine_type)
);

create table IntakeType
(
    intake_type varchar(255) not null,
    primary key (intake_type)
);

create table AgeGroup
(
    group_name varchar(255) NOT NULL,
    min_age    int          not null,
    max_age    int          not null,
    primary key (group_name),
    constraint check_age check ( min_age < max_age)
);

create table SkinTypes
(
    skin_type varchar(255) not null,
    primary key (skin_type)
);

create table Aroma
(
    aroma_name varchar(255) not null,
    primary key (aroma_name)
);

create table SkincareType
(
    skincare_type varchar(255) not null,
    primary key (skincare_type)
);

create table Product
(
    prod_id   int          not null auto_increment,
    name      varchar(255) not null,
    company   varchar(255),
    image_url varchar(255) unique,
    price     double       not null,
    primary key (prod_id),


    constraint positive_price check ( price > 0 )
);

CREATE TABLE Address
(
    address_id      int PRIMARY KEY AUTO_INCREMENT,
    user_id         int          NOT NULL,
    name            varchar(255) NOT NULL,
    city            varchar(255) NOT NULL,
    country         varchar(255) NOT NULL,
    address_field   varchar(255) NOT NULL,
    address_field_2 varchar(255),
    postal_code     int(5) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User (user_id)
);


CREATE TABLE Orders
(
    order_id      int PRIMARY KEY AUTO_INCREMENT,
    order_date    timestamp NOT NULL,
    pharmacy_id   int       NOT NULL,
    patient_id    int       NOT NULL,
    delivery_date datetime,
    order_status  ENUM('ACTIVE', 'SHIPPED', 'DELIVERED', 'CANCELED') NOT NULL,
    order_type    ENUM('CARGO', 'PICKUP') NOT NULL,
    shipping_firm varchar(255),
    address_id    int       NOT NULL,
    FOREIGN KEY (address_id) REFERENCES Address (address_id),
    FOREIGN KEY (pharmacy_id) REFERENCES Pharmacy (pharmacy_id),
    FOREIGN KEY (patient_id) REFERENCES Patient (patient_id)
);

CREATE TABLE Review
(
    review_id int PRIMARY KEY AUTO_INCREMENT,
    rating    int          NOT NULL,
    title     varchar(255) NOT NULL,
    body      varchar(255) NOT NULL,
    order_id  int          NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders (order_id),
    CONSTRAINT rating_value CHECK ( rating <= 5 AND rating >= 1)
);


CREATE TABLE Medicine
(
    prod_id       INT          NOT NULL AUTO_INCREMENT,
    prospectus    varchar(255),
    amount        varchar(255),
    presc_type    enum('WHITE', 'RED', 'GREEN', 'ORANGE', 'PURPLE', 'NONE') not null,
    medicine_type varchar(255) NOT NULL,
    intake_type   varchar(255) NOT NULL,
    primary key (prod_id),
    foreign key (prod_id) references Product (prod_id) ON DELETE CASCADE,
    foreign key (medicine_type) references MedicineType (medicine_type),
    foreign key (intake_type) references IntakeType (intake_type)
);

CREATE TABLE MedicineClass
(
    class_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (class_name)
);


CREATE TABLE class_join_medicine
(
    class_name VARCHAR(255) NOT NULL,
    prod_id    INT          NOT NULL,
    PRIMARY KEY (class_name, prod_id),
    FOREIGN KEY (class_name) REFERENCES MedicineClass (class_name),
    FOREIGN KEY (prod_id) REFERENCES Medicine (prod_id)
);

CREATE TABLE DiseaseType
(
    disease_type varchar(255) PRIMARY KEY NOT NULL
);


CREATE TABLE Disease
(
    disease_id   int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name         varchar(255) NOT NULL,
    disease_type varchar(255),
    description  text,
    FOREIGN KEY (disease_type) REFERENCES DiseaseType (disease_type)
);

CREATE TABLE presc_disease
(
    presc_id   int,
    disease_id int,
    PRIMARY KEY (presc_id, disease_id),
    FOREIGN KEY (presc_id) REFERENCES Prescription (presc_id),
    FOREIGN KEY (disease_id) REFERENCES Disease (disease_id)
);
CREATE TABLE patient_disease
(
    patient_id int,
    disease_id int,
    PRIMARY KEY (patient_id, disease_id),
    FOREIGN KEY (patient_id) REFERENCES Patient (patient_id),
    FOREIGN KEY (disease_id) REFERENCES Disease (disease_id)
);


CREATE TABLE SideEffect
(
    effect_name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    PRIMARY KEY (effect_name)
);

CREATE TABLE pharmacy_product
(
    pharmacy_id int,
    prod_id     int,
    price       decimal(6, 2),
    stock       int,
    description text,
    FOREIGN KEY (pharmacy_id) REFERENCES Pharmacy (pharmacy_id),
    FOREIGN KEY (prod_id) REFERENCES Product (prod_id)
);

CREATE TABLE medicine_presc
(
    med_id      int NOT NULL,
    presc_id    int NOT NULL,
    dosage      varchar(255),
    description text,
    PRIMARY KEY (med_id, presc_id),
    FOREIGN KEY (med_id) REFERENCES Medicine (prod_id),
    FOREIGN KEY (presc_id) REFERENCES Prescription (presc_id)
);


CREATE TABLE medicine_side_effect
(
    effect_name VARCHAR(255) NOT NULL,
    prod_id     INT          NOT NULL,
    PRIMARY KEY (effect_name, prod_id),
    FOREIGN KEY (effect_name) REFERENCES SideEffect (effect_name),
    FOREIGN KEY (prod_id) REFERENCES Medicine (prod_id)
);

create table medicine_age
(
    prod_id    int          not null,
    group_name varchar(255) not null,
    dosage     double,
    unit       ENUM('ml', 'mg','drops', 'tablets', 'capsules' ),
    primary key (prod_id, group_name),
    foreign key (prod_id) references Medicine (prod_id),
    foreign key (group_name) references AgeGroup (group_name)
);

create table join_medicine_type
(
    medicine_type varchar(255) not null,
    prod_id       int          not null,
    primary key (prod_id, medicine_type),
    foreign key (medicine_type) references MedicineType (medicine_type),
    foreign key (prod_id) references Medicine (prod_id)
);

create table ProteinPowder
(
    prod_id          int not null auto_increment,
    weight           int,
    bcaa_percent     double,
    service_amount   double,
    arginine_percent double,
    sugar_percent    double,
    fat_percent      double,
    protein_percent  double,
    aroma_name       varchar(255),
    primary key (prod_id),
    foreign key (prod_id) references Product (prod_id) ON DELETE CASCADE,
    foreign key (aroma_name) references Aroma (aroma_name)
);

create table Skincare
(
    prod_id       int not null auto_increment,
    volume        int,
    skincare_type varchar(255),
    primary key (prod_id),
    foreign key (prod_id) references Product (prod_id) ON DELETE CASCADE,
    foreign key (skincare_type) references SkincareType (skincare_type)
);

create table applicable_skin_types
(
    skin_type  varchar(255) not null,
    product_id int          not null,

    primary key (skin_type, product_id),
    foreign key (skin_type) references SkinTypes (skin_type),
    foreign key (product_id) references Skincare (prod_id)
);

CREATE TABLE product_order
(
    order_id int    NOT NULL,
    prod_id  int    NOT NULL,
    presc_id int,
    price    double NOT NULL,
    count    int    NOT NULL,
    PRIMARY KEY (order_id, prod_id),
    FOREIGN KEY (order_id) REFERENCES Orders (order_id),
    FOREIGN KEY (prod_id) REFERENCES Product (prod_id),
    FOREIGN KEY (presc_id) REFERENCES Prescription (presc_id)
);

CREATE TABLE Payment
(
    payment_id     int PRIMARY KEY AUTO_INCREMENT,
    order_id       int            NOT NULL,
    payment_date   timestamp      NOT NULL,
    payment_amount decimal(10, 2) NOT NULL,
    card_number    int(16) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders (order_id)
);


-- VIEWS-------------------------------------------------------------------------

CREATE VIEW pharmacy_reviews AS
(
SELECT review_id, title, body, rating, pharmacy_id, name, order_id
FROM Review
         NATURAL JOIN Orders
         Natural JOIN Pharmacy
    );

CREATE VIEW pharmacy_ratings AS
(
SELECT pharmacy_id, COUNT(*) AS total_reviews, AVG(rating) AS avg_rating
FROM pharmacy_reviews
GROUP BY pharmacy_id
    );


CREATE view full_medicine AS
(
SELECT *
FROM Product
         NATURAL JOIN Medicine
    );


CREATE VIEW full_protein_powder AS
(
SELECT *
FROM Product
         NATURAL JOIN ProteinPowder);


CREATE VIEW full_skincare AS
(
SELECT *
FROM Product
         NATURAL JOIN Skincare
    );


CREATE VIEW ordered_prescs AS
(
SELECT *
FROM Prescription
ORDER BY CASE
             WHEN status = 'ACTIVE' THEN 1
             ELSE 2
             END,
         write_date DESC
    );


-- TRIGGERS ------------------------------------------------------------------------------------
/*
CREATE TRIGGER update_prescription_status
    AFTER INSERT
    ON Orders
    FOR EACH ROW
BEGIN
    IF EXISTS (
       SELECT * FROM product_order
       WHERE order_id = NEW.order_id AND presc_id IS NOT NULL
   ) THEN
    UPDATE Prescription
    SET status = 'USED'
    WHERE presc_id IN (SELECT DISTINCT presc_id
                       FROM product_order
                       WHERE order_id = NEW.order_id);
END IF;
END;


CREATE TRIGGER add_order_total_to_pharmacy_balance
    AFTER UPDATE
    ON Orders
    FOR EACH ROW
BEGIN
    DECLARE pharmacy_balance double;


   IF NEW.order_status = 'SHIPPED' AND OLD.order_status = 'ACTIVE' THEN
    SELECT balance
    INTO pharmacy_balance
    FROM Pharmacy
    WHERE pharmacy_id = NEW.pharmacy_id;


    UPDATE Pharmacy
    SET balance = pharmacy_balance + (SELECT SUM(price * count)
                                      FROM product_order
                                      WHERE order_id = NEW.order_id)
    WHERE pharmacy_id = NEW.pharmacy_id;
END IF;
END;


CREATE TRIGGER delete_medicine_join_tables
    AFTER DELETE
    ON Medicine
    FOR EACH ROW
BEGIN
    DELETE FROM class_join_medicine WHERE prod_id = OLD.prod_id;
    DELETE FROM medicine_side_effect WHERE prod_id = OLD.prod_id;
    DELETE FROM join_medicine_type WHERE prod_id = OLD.prod_id;
    DELETE FROM medicine_age WHERE prod_id = OLD.prod_id;
END;

CREATE TRIGGER delete_skincare_join_rows
    BEFORE DELETE
    ON Skincare
    FOR EACH ROW
BEGIN
    DELETE
    FROM applicable_skin_types
    WHERE product_id = OLD.prod_id;
END;


CREATE TRIGGER update_inventory
    AFTER INSERT
    ON product_order
    FOR EACH ROW
BEGIN
    UPDATE pharmacy_product
    SET stock = stock - NEW.count
    WHERE prod_id = NEW.prod_id
      AND pharmacy_id = (SELECT pharmacy_id FROM Orders WHERE order_id = NEW.order_id);
END;

*/

-- Sample data Insertion----------------------------------------------------------------------

-- Actors------------------------------------------------------------------------------------
INSERT INTO User (user_id, email, password, phone)
VALUES (1, 'deniz@gmail.com', 'Pass123', '532033931'),
       (2, 'ceren@gmail.com', 'Pass321', '324323024'),
       (3, 'dağhan@gmail.com', 'Pass321', '324324233'),
       (4, 'aliemir@gmail.com', 'Pasd301', NULL),
       (5, 'arda@gmail.com', 'Passwordo', '3940909090'),
       (6, 'faruk.eczane@gmail.com', 'Eczane123', '423809444'),
       (7, 'gonul.eczane@gmail.com', 'Eczane321', '213213122'),
       (8, 'admin@gmail.com', 'Admin123', '312312312'),
       (9, 'fatih.eczane@gmail.com', 'Eczo12', '31232132'),
       (10, 'reject.rejectoğlu@gmail.com', 'rejecto', '533313231'),
       (11, 'rejectullah.ezczane@gmail.com', 'Reject Eczo')
;

INSERT INTO Person(person_id, name, surname, tck, is_admin)
VALUES (1, 'Deniz Mert', 'Dilaverler', 41963970444, FALSE),
       (2, 'Ceren', 'Akyar', 218371298, FALSE),
       (3, 'Dağhan', 'Ünal', 231231233, FALSE),
       (4, 'Ali Emir', 'Güzey', 21312332, FALSE),
       (5, 'Arda', 'Baktır', 123123212, FALSE),
       (8, 'Admin', 'Adminoğlu', 12312312, TRUE),
       (10, 'Reject', 'Rejectoğlu', 123213123, FALSE)
;

INSERT INTO Pharmacy(pharmacy_id, name, is_on_duty, diploma_path, balance, approval_status)
VALUES (6, 'Faruk Pharmacy', TRUE, NULL, 2000, 'APPROVED'),
       (7, 'Gönül Pharmacy', FALSE, NULL, 3000, 'APPROVED'),
       (9, 'Fatih Pharmacy', TRUE, NULL, 0, 'PENDING'),
       (11, 'Rejectullah Pharmacy', TRUE, NULL, 1, 'REJECTED')
;

INSERT INTO Doctor(doctor_id, speciality, approval_status)
VALUES (2, 'Clinic Doctor', 'APPROVED'),
       (4, 'Urologist', 'PENDING'),
       (10, 'Cardiologist', 'REJECTED')
;

INSERT INTO Patient(patient_id, birth_date, weight, height, gender)
VALUES (1, '2002-04-05', 78.5, 182, 'M'),
       (3, '2002-08-23', 79, 185, 'M'),
       (5, '2002-01-01', 82, 182, 'M')
;

-- Medicine---------------------------------------------------------------------------------
