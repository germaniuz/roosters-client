export const PRODUCT_LIST = gql`
    query clientProductList($ids: [Int], $search: String, $limit: Int, $offset: Int) {
        clientProductList(ids: $ids, search: $search, limit: $limit, offset: $offset) {
            items {
                id
                created_at
                updated_at
                name
                description
                nutritional_value_proteins
                nutritional_value_fats
                nutritional_value_carbs
                energy_value
                file {
                    url
                }
                product_category_options {
                    id
                }
                product_ingredients {
                    id
                }
                badges {
                    id
                    name
                }
                category_option_ingredient_excludes {
                    id
                }
                product_unique_ingredients {
                    id
                }
                category {
                    id
                    name
                }
            }
            count
        }
    }
`;
