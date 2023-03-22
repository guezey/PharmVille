
ALTER TABLE public.disease DROP COLUMN type;

create table public.disease_types
(
    name text primary key not null,
    disease_id integer,
    foreign key (disease_id) references public.disease (id)
);


