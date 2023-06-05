from flask import current_app


def to_string_tuple(values):
    return ', '.join("'" + value + "'" for value in values)


class BaseQueryBuilder:
    def __init__(self, **kwargs):
        self.ordering = kwargs.get("ordering")
        self.order_type = kwargs.get("order_type")
        self.min_price = kwargs.get('min_price')
        self.max_price = kwargs.get('max_price'),
        self.pharmacy_id = kwargs.get('pharmacy_id')

    def _apply_ordering(self):
        order_str = ""
        if self.ordering and self.order_type:
            if self.order_type == "ALPHABETICAL":
                order_str = " ORDER BY LOWER(name) "
            elif self.order_type == 'PRICE':
                order_str = " ORDER BY price "
            else:
                raise ValueError(f"order type can either be 'ALPHABETICAL' or 'PRICE' current type:{self.order_type} ")

            if self.ordering == "ASC" or self.ordering == "DESC":
                order_str += self.ordering
            else:
                raise ValueError(f"'ordering' must be 'ASC' or 'DESC' current value: {self.ordering}")
        return order_str

    def _get_pharmacy_id_predicate(self):
        predicate = ""
        if self.pharmacy_id:
            predicate = f" prod_id IN (SELECT prod_id FROM pharmacy_product WHERE pharmacy_id = {self.pharmacy_id} )"
        if predicate == "":
            return None
        else:
            return predicate

    def _apply_price_range(self):
        price_predicate = ""
        # validate fields

        if self.min_price and self.max_price:
            price_predicate = f" price BETWEEN {self.min_price} AND {self.max_price} "
        elif self.min_price:
            price_predicate = f" price >= {self.min_price} "
        elif self.max_price:
            price_predicate = f" price <= {self.max_price} "

        if price_predicate == "":
            return None
        else:
            return price_predicate


class MedicineQueryBuilder(BaseQueryBuilder):
    base_query = "SELECT * FROM full_medicine "

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.name = kwargs.get('search_key')
        self.side_effects = kwargs.get('side_effects')
        self.medicine_classes = kwargs.get('medicine_classes')
        self.intake_types = kwargs.get('intake_types')
        self.age_groups = kwargs.get('age_groups')
        self.presc_types = kwargs.get('presc_types')

    def build(self):
        query = MedicineQueryBuilder.base_query

        predicates = list()

        if self.name:
            predicates.append(f"LOWER(name) LIKE LOWER('%{self.name}%') ")

        if self.presc_types and len(self.presc_types) > 0:
            predicates.append(f" presc_type IN ({to_string_tuple(self.presc_types)}) ")

        if self.side_effects and len(self.side_effects) > 0:
            predicates.append(f""" prod_id NOT IN
            (SELECT prod_id FROM medicine_side_effect 
            WHERE effect_name IN ({to_string_tuple(self.side_effects)})) """)

        if self.intake_types and len(self.intake_types) > 0:
            predicates.append(f" intake_type IN ({to_string_tuple(self.intake_types)}) ")

        if self.age_groups and len(self.age_groups) > 0:
            predicates.append(f""" prod_id IN 
            (SELECT prod_id FROM medicine_age 
            WHERE group_name IN ({to_string_tuple(self.age_groups)})
            ) 
            """)

        if self.medicine_classes and len(self.medicine_classes) > 0:
            predicates.append(f"""
                prod_id IN (SELECT prod_id
                 FROM class_join_medicine
                 WHERE class_name IN ({to_string_tuple(self.medicine_classes)})
                 GROUP BY prod_id
                 HAVING COUNT(DISTINCT class_name) = {len(self.medicine_classes)})
            """)

        price_predicate = self._apply_price_range()
        if not price_predicate:
            predicates.append(price_predicate)

        pharmacy_predicate = self._get_pharmacy_id_predicate()
        if pharmacy_predicate:
            predicates.append(pharmacy_predicate)

        if len(predicates) != 0:
            query += "WHERE "
            query += " AND ".join(predicates)

        query += self._apply_ordering()
        return query


class ProteinPowderQueryBuilder(BaseQueryBuilder):
    base_query = "SELECT * FROM full_protein_powder "

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.search_key = kwargs.get('search_key')
        self.aromas = kwargs.get('aromas')

    def build(self):
        query = ProteinPowderQueryBuilder.base_query
        predicates = list()

        if self.search_key:
            predicates.append(f" LOWER(name) LIKE LOWER('%{self.search_key}%') ")

        if self.aromas and len(self.aromas) > 0:
            predicates.append(f""" aroma_name IN ({to_string_tuple(self.aromas)}) """)
        price_predicate = self._apply_price_range()
        if not price_predicate:
            predicates.append(price_predicate)

        pharmacy_predicate = self._get_pharmacy_id_predicate()
        if pharmacy_predicate:
            predicates.append(pharmacy_predicate)
        if len(predicates) != 0:
            query += " WHERE "
            query += " AND ".join(predicates)

        query += self._apply_ordering()
        return query


class SkincareQueryBuilder(BaseQueryBuilder):
    base_query = "SELECT * FROM full_skincare "

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.search_key = kwargs.get('search_key')
        self.skincare_types = kwargs.get('skincare_types')
        self.skin_types = kwargs.get('skin_types')

    def build(self):
        query = SkincareQueryBuilder.base_query
        predicates = list()

        if self.search_key:
            predicates.append(f" LOWER(name) LIKE LOWER('%{self.search_key}%') ")

        if self.skincare_types:
            predicates.append(f""" skincare_type IN ({to_string_tuple(self.skincare_types)}) """)

        if self.skin_types:
            predicates.append(f""" prod_id IN
                    (SELECT product_id FROM applicable_skin_types 
                        WHERE skin_type IN ({to_string_tuple(self.skin_types)}) ) 
                """)

        price_predicate = self._apply_price_range()
        if not price_predicate:
            predicates.append(price_predicate)

        pharmacy_predicate = self._get_pharmacy_id_predicate()
        if pharmacy_predicate:
            predicates.append(pharmacy_predicate)
        if len(predicates) != 0:
            query += " WHERE "
            query += " AND ".join(predicates)

        query += self._apply_ordering()
        return query
