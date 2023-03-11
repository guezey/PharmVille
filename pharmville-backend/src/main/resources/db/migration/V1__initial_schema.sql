--Order of the create queries are important

create table public."user"
(
    id       integer primary key not null,
    email    text                not null,
    password text                not null
);

create table public.pharmacy
(
    id              integer primary key not null,
    name            text                not null,
    opening_time    time without time zone not null,
    closing_time    time without time zone not null,
    diploma_path    text                not null,
    approval_status boolean,
    foreign key (id) references public."user" (id)
        match simple on update cascade on delete cascade
);

create table public.person
(
    id       integer primary key not null,
    name     text,
    surname  text,
    tck      integer             not null,
    is_admin boolean             not null,
    foreign key (id) references public."user" (id)
        match simple on update cascade on delete cascade
);

create table public.patient
(
    id      integer primary key not null,
    balance double precision    not null,
    age     integer             not null,
    weight  integer             not null,
    height  integer             not null,
    foreign key (id) references public.person (id)
        match simple on update cascade on delete cascade
);

create table public.address
(
    id              integer primary key not null,
    name            text                not null,
    country         text                not null,
    city            text                not null,
    address_field_1 text                not null,
    address_field_2 text,
    postal_code     integer             not null,
    owner_id        integer             not null,
    foreign key (owner_id) references public.patient (id)
        match simple on update no action on delete no action
);

create table public.disease
(
    id          integer primary key not null,
    name        text                not null,
    type        text                not null,
    description text
);

create table public.doctor
(
    id              integer primary key not null,
    speciality      text,
    hospital        text,
    approval_status boolean,
    diploma_path    text                not null,
    foreign key (id) references public.person (id)
        match simple on update cascade on delete cascade
);

create table public.prescription
(
    id                integer primary key not null,
    prescribed_date   timestamp without time zone not null,
    active_until_date timestamp without time zone not null,
    type              text                not null,
    status            text                not null,
    prescribed_by_id  integer             not null,
    prescribed_to_id  integer,
    foreign key (prescribed_by_id) references public.doctor (id)
        match simple on update no action on delete no action,
    foreign key (prescribed_to_id) references public.patient (id)
        match simple on update no action on delete no action
);

create table public.prescription_for_disease
(
    prescription_id integer not null,
    disease_id      integer not null,
    foreign key (disease_id) references public.disease (id)
        match simple on update no action on delete no action,
    foreign key (prescription_id) references public.prescription (id)
        match simple on update no action on delete no action
);
create table public.product
(
    id         integer primary key not null,
    name       text                not null,
    company    text                not null,
    image_path text
);

create table public.medicine
(
    id                integer primary key not null,
    lowest_age        integer             not null,
    highest_age       integer,
    prescription_type text                not null,
    intake_method     text                not null,
    prospectus        text                not null,
    foreign key (id) references public.product (id)
        match simple on update cascade on delete cascade
);

create table public.medicine_in_prescription
(
    medicine_id     integer not null,
    prescription_id integer not null,
    dosage          text    not null,
    foreign key (medicine_id) references public.medicine (id)
        match simple on update no action on delete no action,
    foreign key (prescription_id) references public.prescription (id)
        match simple on update no action on delete no action
);

create table public.side_effect
(
    id          integer primary key not null,
    name        text                not null,
    description text
);


create table public.medicine_side_effect
(
    medicine_id    integer not null,
    side_effect_id integer not null,
    foreign key (medicine_id) references public.medicine (id)
        match simple on update no action on delete no action,
    foreign key (side_effect_id) references public.side_effect (id)
        match simple on update no action on delete no action
);

create table public."order"
(
    id                  integer primary key not null,
    order_date          timestamp without time zone not null,
    status              text                not null,
    shipped_by          text                not null,
    type                text                not null,
    ordered_by_id       integer             not null,
    ordered_from_id     integer             not null,
    shipping_address_id integer             not null,
    foreign key (shipping_address_id) references public.address (id)
        match simple on update no action on delete no action,
    foreign key (ordered_by_id) references public.patient (id)
        match simple on update no action on delete no action,
    foreign key (ordered_from_id) references public.pharmacy (id)
        match simple on update no action on delete no action
);


create table public.product_in_order
(
    order_id   integer          not null,
    product_id integer          not null,
    price      double precision not null,
    count      integer          not null,
    foreign key (order_id) references public."order" (id)
        match simple on update no action on delete no action,
    foreign key (product_id) references public.product (id)
        match simple on update no action on delete no action
);

create table public.product_in_pharmacy
(
    product_id  integer not null,
    pharmacy_id integer not null,
    price       integer not null,
    stock       integer not null,
    description text,
    foreign key (pharmacy_id) references public.pharmacy (id)
        match simple on update no action on delete no action,
    foreign key (product_id) references public.product (id)
        match simple on update no action on delete no action
);


