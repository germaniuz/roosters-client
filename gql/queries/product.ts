import { gql } from 'graphql-tag';

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
                    price
                    category_option {
                        id
                        option {
                            id
                            name
                        }
                        category {
                            id
                            name
                        }
                        order
                    }
                }
                product_ingredients {
                    id
                    ingredient {
                        id
                        name
                    }
                }
                badges {
                    id
                    name
                    file {
                        url
                    }
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
                    category_options_ingredient {
                        id
                        price
                        category_options {
                            id
                            option {
                                id
                            }
                        }
                        ingredient {
                            id
                            name
                            file {
                                url
                            }
                        }
                    }
                }
            }
            count
        }
    }
`;
