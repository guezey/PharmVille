-- CREATE CODES ---------------------------------------------------------------------
CREATE TABLE User
(
    user_id  int PRIMARY KEY AUTO_INCREMENT,
    email    varchar(255) NOT NULL,
    password char(60)     NOT NULL,
    phone    CHAR(10)
);

CREATE TABLE Person
(
    person_id int PRIMARY KEY NOT NULL,
    name      varchar(255),
    surname   varchar(255),
    tck       char(11)        NOT NULL,
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
    doctor_id       int PRIMARY KEY                        NOT NULL,
    speciality      varchar(255),
    approval_status ENUM ('APPROVED','REJECTED','PENDING') NOT NULL,
    FOREIGN KEY (doctor_id) REFERENCES Person (person_id)
);

CREATE TABLE Pharmacy
(
    pharmacy_id     int PRIMARY KEY                        NOT NULL,
    name            varchar(255)                           NOT NULL,
    is_on_duty      boolean                                NOT NULL,
    diploma_path    text DEFAULT NULL,
    balance         decimal(10, 2)                         NOT NULL,
    approval_status ENUM ('APPROVED','REJECTED','PENDING') NOT NULL,
    FOREIGN KEY (pharmacy_id) REFERENCES User (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Prescription
(
    presc_id   int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    doctor_id  int                            NOT NULL,
    patient_id int                            NOT NULL,
    write_date datetime                       NOT NULL,
    due_date   datetime                       NOT NULL,
    type       enum ('WHITE', 'RED', 'GREEN', 'ORANGE', 'PURPLE', 'NONE') DEFAULT 'NONE',
    status     enum ('ACTIVE', 'USED', 'OVERDUE'),
    FOREIGN KEY (doctor_id) REFERENCES Doctor (doctor_id),
    FOREIGN KEY (patient_id) REFERENCES Patient (patient_id)
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
    image_url varchar(255) unique DEFAULT NULL,
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
    postal_code     int(5)       NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User (user_id)
);


CREATE TABLE Orders
(
    order_id      int PRIMARY KEY AUTO_INCREMENT,
    order_date    timestamp                                           NOT NULL,
    pharmacy_id   int                                                 NOT NULL,
    patient_id    int                                                 NOT NULL,
    delivery_date datetime,
    order_status  ENUM ('ACTIVE', 'SHIPPED', 'DELIVERED', 'CANCELED') NOT NULL,
    order_type    ENUM ('CARGO', 'PICKUP')                            NOT NULL,
    shipping_firm varchar(255),
    address_id    int                                                 NOT NULL,
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
    prod_id     INT                                                        NOT NULL AUTO_INCREMENT,
    prospectus  varchar(255),
    amount      varchar(255),
    presc_type  enum ('WHITE', 'RED', 'GREEN', 'ORANGE', 'PURPLE', 'NONE') not null,
    intake_type varchar(255)                                               NOT NULL,
    primary key (prod_id),
    foreign key (prod_id) references Product (prod_id) ON DELETE CASCADE,
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
    name         varchar(255)                   NOT NULL,
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
    prod_id        int          not null,
    group_name     varchar(255) not null,
    advised_dosage double,
    unit           ENUM ('ml', 'mg','drops', 'tablets', 'capsules', 'mg per kg of body-weight', 'times', 'puffs' ),
    primary key (prod_id, group_name),
    foreign key (prod_id) references Medicine (prod_id),
    foreign key (group_name) references AgeGroup (group_name)
);

create table ProteinPowder
(
    prod_id          int not null auto_increment,
    weight           float,
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
    volume        varchar(255),
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
    card_number    int(16)        NOT NULL,
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
       (11, 'rejectullah.ezczane@gmail.com', 'Reject Eczo', '531011002')
;

INSERT INTO Person(person_id, name, surname, tck, is_admin)
VALUES (1, 'Deniz Mert', 'Dilaverler', '41963970444', FALSE),
       (2, 'Ceren', 'Akyar', '21837129811', FALSE),
       (3, 'Dağhan', 'Ünal', '23123123301', FALSE),
       (4, 'Ali Emir', 'Güzey', '21312332986', FALSE),
       (5, 'Arda', 'Baktır', '12312321228', FALSE),
       (8, 'Admin', 'Adminoğlu', '12312312764', TRUE),
       (10, 'Reject', 'Rejectoğlu', '12321312315', FALSE)
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

-- Product --------------------------------------------------------------------------------
INSERT INTO Product(prod_id, name, company, price)
VALUES (1, 'Calpol', 'Bayer', 70),
       (2, 'Nexium', 'Abdi Ibrahim', 90),
       (3, 'Ibuprofen', 'Bayer', 110.70),
       (4, 'Arveles', 'Bayer', 60),
       (5, 'Majezik', 'Abdi Ibrahim', 60.90),
       (6, 'Advil', 'Abdi Ibrahim', 62.30),
       (7, 'Aferin', 'Eczacıbaşı', 40.20),
       (8, 'Rennie', 'Eczacıbaşı', 50.30),
       (9, 'Nurofen', 'Eczacıbaşı', 80.20),
       (10, 'Paranox', 'Bayer', 30.40),
       (11, 'Ventolin', 'Bayer', 60)
;
-- Medicine---------------------------------------------------------------------------------
INSERT INTO SideEffect(effect_name, description)
VALUES ('Nausea', 'Urge to vomit'),
       ('Abdominal Pain', 'Pain in the Abdomen'),
       ('Headache', 'Pain in the head'),
       ('Diarrhea', 'Wet poop'),
       ('Constipation', 'No Poop ;('),
       ('Allergic Reaction', 'Medicine can cause allergic reactions on some patients'),
       ('Heartburn', 'Burning feeling on heart'),
       ('Dizziness', 'Dizzy feeling'),
       ('Stomach Upset', 'Sad stomach :('),
       ('Stomach Pain', 'Pain in the stomach'),
       ('Increased Heart Rate', 'Heart rate go VROOOOOM!'),
       ('Elevated blood pressure', 'Blood pressure increases'),
       ('Restlessness', 'Inability to stay relaxed'),
       ('Nervousness', 'Feeling of unease and anxiety')
;

INSERT INTO MedicineClass(class_name)
VALUES ('Painkiller'),
       ('Fever Reducer'),
       ('Birth Control'),
       ('Immunity Enhancer'),
       ('Cold Medicine'),
       ('Allergy Medication'),
       ('Antacid'),
       ('Inflammation Reducer'),
       ('Asthma'),
       ('Heart Medicine')
;

INSERT INTO AgeGroup(group_name, min_age, max_age)
VALUES ('Infants', 0, 1),
       ('Children', 1, 13),
       ('Adolescents', 13, 18),
       ('Adults', 18, 65),
       ('Elderly', 65, 999);


Insert INTO IntakeType(intake_type)
VALUES ('Capsule'),
       ('Tablet'),
       ('Syrup'),
       ('Syringe'),
       ('Rectal'),
       ('Eyedrop'),
       ('Inhaler'),
       ('Suspension')
;

INSERT INTO Medicine (prod_id, prospectus, amount, presc_type, intake_type)
VALUES (1, 'Calpol Prospectus', '200ml', 'NONE', 'Syrup'),
       (2, 'Nexium Prospectus', '20 Tablets', 'NONE', 'Tablet'),
       (3, 'Ibuprofen Prospectus', '20 Tablets', 'PURPLE', 'Tablet'),
       (4, 'Arveles Prospectus', '10 Capsules', 'GREEN', 'Capsule'),
       (5, 'Majezik Prospectus', '15 Capsules', 'RED', 'Capsule'),
       (6, 'Advil Prospectus', '30 Tablets', 'GREEN', 'Tablet'),
       (7, 'Aferin Prospectus', '250ml', 'ORANGE', 'Syrup'),
       (8, 'Rennie Prospectus', '30 Tablets', 'WHITE', 'Tablet'),
       (9, 'Nurofen Prospectus', '250ml', 'RED', 'Suspension'),
       (10, 'Paranox Prospectus', '200ml', 'NONE', 'Tablet'),
       (11, 'Ventolin Prospectus', '2.5ml', 'NONE', 'Inhaler')
;


INSERT INTO class_join_medicine (prod_id, class_name)
VALUES (1, 'Fever Reducer'),
       (1, 'Painkiller'),
       (2, 'Antacid'),
       (3, 'Fever Reducer'),
       (3, 'Painkiller'),
       (4, 'Painkiller'),
       (5, 'Painkiller'),
       (6, 'Inflammation Reducer'),
       (6, 'Painkiller'),
       (7, 'Painkiller'),
       (8, 'Antacid'),
       (9, 'Fever Reducer'),
       (9, 'Painkiller'),
       (10, 'Fever Reducer'),
       (10, 'Painkiller'),
       (11, 'Asthma')
;

INSERT INTO medicine_age(prod_id, group_name, advised_dosage, unit)
VALUES (1, 'Infants', 13, 'mg per kg of body-weight'),
       (1, 'Children', 15, 'mg per kg of body-weight'),
       (1, 'Adolescents', 750, 'mg'),
       (1, 'Adults', 750, 'mg'),
       (1, 'Elderly', 750, 'mg'),

       (2, 'Children', 15, 'mg'),
       (2, 'Adolescents', 30, 'mg'),
       (2, 'Adults', 35, 'mg'),
       (2, 'Elderly', 35, 'mg'),

       (3, 'Children', 7.5, 'mg per kg of body-weight'),
       (3, 'Adolescents', 300, 'mg'),
       (3, 'Adults', 300, 'mg'),
       (3, 'Elderly', 300, 'mg'),

       (4, 'Children', 7.5, 'mg per kg of body-weight'),
       (4, 'Adolescents', 300, 'mg'),
       (4, 'Adults', 300, 'mg'),
       (4, 'Elderly', 300, 'mg'),

       (5, 'Children', 7.5, 'mg per kg of body-weight'),
       (5, 'Adolescents', 350, 'mg'),
       (5, 'Adults', 350, 'mg'),
       (5, 'Elderly', 350, 'mg'),

       (6, 'Children', 7.5, 'mg per kg of body-weight'),
       (6, 'Adolescents', 300, 'mg'),
       (6, 'Adults', 350, 'mg'),
       (6, 'Elderly', 350, 'mg'),

       (7, 'Children', 7.5, 'mg per kg of body-weight'),
       (7, 'Adolescents', 300, 'mg'),
       (7, 'Adults', 350, 'mg'),
       (7, 'Elderly', 350, 'mg'),

       (8, 'Adolescents', 300, 'mg'),
       (8, 'Adults', 400, 'mg'),
       (8, 'Elderly', 350, 'mg'),

       (9, 'Adolescents', 300, 'mg'),
       (9, 'Adults', 350, 'mg'),
       (9, 'Elderly', 350, 'mg'),

       (10, 'Children', 0.5, 'tablets'),
       (10, 'Adolescents', 1.5, 'tablets'),
       (10, 'Adults', 2, 'tablets'),
       (10, 'Elderly', 2, 'tablets'),

       (11, 'Children', 1, 'puffs'),
       (11, 'Adolescents', 2, 'puffs'),
       (11, 'Adults', 2, 'puffs'),
       (11, 'Elderly', 2, 'puffs');

INSERT INTO medicine_side_effect(prod_id, effect_name)
VALUES (1, 'Allergic Reaction'),

       (2, 'Headache'),
       (2, 'Diarrhea'),
       (2, 'Nausea'),
       (2, 'Stomach Pain'),

       (3, 'Stomach Upset'),
       (3, 'Heartburn'),
       (3, 'Nausea'),
       (3, 'Dizziness'),
       (3, 'Headache'),

       (4, 'Nausea'),
       (4, 'Diarrhea'),
       (4, 'Abdominal Pain'),

       (5, 'Stomach Upset'),
       (5, 'Heartburn'),
       (5, 'Nausea'),
       (5, 'Headache'),

       (6, 'Stomach Upset'),
       (6, 'Heartburn'),
       (6, 'Nausea'),
       (6, 'Headache'),
       (6, 'Dizziness'),

       (7, 'Increased Heart Rate'),
       (7, 'Elevated Blood Pressure'),
       (7, 'Restlessness'),
       (7, 'Nervousness'),

       (9, 'Stomach Upset'),
       (9, 'Heartburn'),
       (9, 'Dizziness'),
       (9, 'Headache'),

       (11, 'Increased Heart Rate'),
       (11, 'Headache')
;

INSERT INTO pharmacy_product (pharmacy_id, prod_id, stock, description)
VALUES (6, 1, 10, 'Incredible :)'),
       (6, 2, 5, 'HEALTH HEALTH'),
       (6, 3, 7, 'I use it myself'),


       (7, 1, 6, 'I love it!!'),
       (7, 2, 11, 'Zuum Zumm'),
       (7, 4, 5, 'Zom Zom')
;
-- Protein Powders------------------------------------------------------------
INSERT INTO Aroma (aroma_name)
VALUES ('Chocolate'),
       ('Vanilla'),
       ('Strawberry'),
       ('Banana'),
       ('Cookies and Cream'),
       ('Mint'),
       ('Caramel')
;

INSERT INTO Product (prod_id, name, company, image_url, price)
VALUES (12, 'Whey Protein Powder', 'Optimum Nutrition', NULL, 149.99),
       (13, 'Plant-Based Protein Powder', 'Vega', NULL, 124.99),
       (14, 'Casein Protein Powder', 'Dymatize', NULL, 179.99),
       (15, 'Pea Protein Powder', 'NOW Sports', NULL, 99.99),
       (16, 'Collagen Protein Powder', 'Vital Proteins', NULL, 149.99),
       (17, 'ISO 100 Whey Protein', 'Dymatize', NULL, 189.99),
       (18, 'Chocolate Peanut Butter Protein', 'MuscleTech', NULL, 149.99),
       (19, 'Raw Organic Protein Powder', 'Garden of Life', NULL, 139.99),
       (20, 'Mass Gainer Protein Powder', 'Optimum Nutrition', NULL, 169.99)
;
INSERT INTO ProteinPowder (prod_id, weight, bcaa_percent, service_amount, arginine_percent, sugar_percent,
                           fat_percent, protein_percent, aroma_name)
VALUES (12, 1.4, 25.0, 29, 5.0, 2.0, 1.5, 80.0, 'Chocolate'),
       (13, 1.2, 20.0, 25, 4.0, 1.5, 1.0, 75.0, 'Vanilla'),
       (14, 1.25, 23.0, 26, 4.5, 2.5, 2.0, 78.0, 'Strawberry'),
       (15, 2, 22.0, 24, 3.5, 1.0, 1.2, 70.0, 'Cookies and Cream'),
       (16, 3, 21.0, 22, 4.2, 2.2, 1.8, 73.0, 'Vanilla'),
       (17, 4, 24.0, 21, 4.8, 2.8, 1.3, 82.0, 'Chocolate'),
       (18, 1, 19.0, 27, 3.8, 1.3, 1.1, 77.0, 'Vanilla'),
       (19, 0.5, 21.5, 28, 4.3, 2.3, 1.9, 79.0, 'Vanilla'),
       (20, 1.25, 23.5, 27, 4.2, 1.8, 1.4, 74.0, 'Chocolate');

-- Skincare products --------------------------------------------
INSERT INTO SkincareType(skincare_type)
VALUES ('Lip Balm'),
       ('Serum'),
       ('BB-CC Cream'),
       ('Lotion'),
       ('Eye Cream'),
       ('Tonic'),
       ('Sunscreen'),
       ('Cream'),
       ('Scrub'),
       ('Cleanser'),
       ('Mask'),
       ('Treatment');

INSERT INTO SkinTypes(skin_type)
VALUES ('Oily'),
       ('Dry'),
       ('Combination'),
       ('Sensitive'),
       ('Normal')
;

INSERT INTO Product (prod_id, name, company, image_url, price)
VALUES (21, 'Moisturizing Lip Balm', 'Nivea', NULL, 9.99),
       (22, 'Vitamin C Serum', 'The Ordinary', NULL, 29.99),
       (23, 'BB Cream', 'Maybelline', NULL, 14.99),
       (24, 'Hydrating Lotion', 'Cetaphil', NULL, 19.99),
       (25, 'Revitalizing Eye Cream', 'Neutrogena', NULL, 24.99),
       (26, 'Balancing Tonic', 'Pixi', NULL, 17.99),
       (27, 'Anti-Aging Night Cream', 'Olay', NULL, 49.99),
       (28, 'Sunscreen SPF 50', 'La Roche-Posay', NULL, 39.99),
       (29, 'Exfoliating Scrub', 'St. Ives', NULL, 19.99),
       (30, 'Cleansing Oil', 'Garnier', NULL, 29.99),
       (31, 'Sheet Mask Set', 'Tony Moly', NULL, 24.99),
       (32, 'Acne Spot Treatment', 'Clean & Clear', NULL, 14.99);

INSERT INTO Skincare (prod_id, volume, skincare_type)
VALUES (21, '5g', 'Lip Balm'),
       (22, '30ml', 'Serum'),
       (23, '50ml', 'BB-CC Cream'),
       (24, '100ml', 'Lotion'),
       (25, '15ml', 'Eye Cream'),
       (26, '200ml', 'Tonic'),
       (27, '50ml', 'Cream'),
       (28, '100ml', 'Sunscreen'),
       (29, '150ml', 'Scrub'),
       (30, '200ml', 'Cleanser'),
       (31, '10-pack', 'Mask'),
       (32, '15ml', 'Treatment');

INSERT INTO applicable_skin_types (product_id, skin_type)
VALUES (21, 'Dry'),
       (21, 'Normal'),
       (22, 'Combination'),
       (22, 'Oily'),
       (22, 'Sensitive'),
       (23, 'Normal'),
       (24, 'Dry'),
       (24, 'Normal'),
       (25, 'Combination'),
       (25, 'Sensitive'),
       (26, 'Combination'),
       (26, 'Oily'),
       (26, 'Normal'),
       (27, 'Dry'),
       (27, 'Normal'),
       (28, 'Combination'),
       (28, 'Sensitive'),
       (29, 'Normal'),
       (30, 'Dry'),
       (30, 'Combination'),
       (31, 'Normal'),
       (32, 'Oily'),
       (32, 'Combination'),
       (32, 'Sensitive');