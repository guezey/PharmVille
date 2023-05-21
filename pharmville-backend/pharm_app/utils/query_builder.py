def to_string_tuple(values):
    return ', '.join("'" + value + "'" for value in values)

class MedicineQueryBuilder:
    base_query = "SELECT * FROM full_medicine "

    def __init__(self, **kwargs):
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
            predicates.append(f"name LIKE '\%{self.name}\%' ")

        if self.presc_types:
            predicates.append(f" presc_type IN ({to_string_tuple(self.presc_types)}) ")

        if self.side_effects:
            predicates.append(f""" prod_id NOT IN
            (SELECT prod_id FROM medicine_side_effect 
            WHERE effect_name IN ({to_string_tuple(self.side_effects)})) """)

        if self.intake_types:
            predicates.append(f" intake_type IN ({to_string_tuple(self.intake_types)}) ")

        if self.age_groups:
            predicates.append(f""" prod_id NOT IN
            (SELECT prod_id FROM medicine_side_effect 
            WHERE effect_name IN ({to_string_tuple(self.side_effects)})) 
                        """)

        if self.medicine_classes:
            predicates.append(f"""
                prod_id IN (SELECT prod_id
                 FROM class_join_medicine
                 WHERE class_name IN ({to_string_tuple(self.medicine_classes)})
                 GROUP BY prod_id
                 HAVING COUNT(DISTINCT class_name) = {len(self.medicine_classes)})
            """)

        if self.age_groups:
            predicates.append(f""" prod_id IN 
            (SELECT prod_id FROM medicine_age 
            WHERE group_name 
            IN ({to_string_tuple(self.age_groups)}))
            """)

        if len(predicates) != 0:
            query += "WHERE "
            query += " AND ".join(predicates)

        return query

