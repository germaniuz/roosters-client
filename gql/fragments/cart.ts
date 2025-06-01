import { gql } from 'graphql-tag';

export const CART_ITEM_FRAGMENT = gql`
    fragment CartItem on ClientCartItem {
        id
        quantity
        preset {
            id
            name
        }
        product {
            id
            created_at
            updated_at
            product_id
            product {
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
                    id
                    url
                }
                product_category_options {
                    id
                    created_at
                    updated_at
                    product_id
                    category_option_id
                    weight
                    price
                }
                product_ingredients {
                    id
                    created_at
                    updated_at
                    product_id
                    ingredient_id
                    ingredient {
                        id
                        name
                        description
                        file {
                            id
                            url
                        }
                    }
                    order
                }
                badges {
                    id
                    name
                    description
                    file {
                        id
                        url
                    }
                }
                category_option_ingredient_excludes {
                    id
                    created_at
                    updated_at
                    order
                    price
                }
                product_unique_ingredients {
                    id
                    created_at
                    updated_at
                    product_id
                    ingredient_id
                    price
                    order
                }
                category {
                    id
                    created_at
                    updated_at
                    slug
                    name
                    description
                    file {
                        name
                        url
                    }
                }
                is_active
            }
            category_option_id
            category_option {
                id
                option {
                    id
                    name
                    description
                }
            }
            weight
            price
        }
        cart_category_option_ingredients {
            quantity
            category_option_ingredient {
                id
                price
                ingredient {
                    name
                    file {
                        url
                    }
                }
            }
        }
        exclude_product_ingredients {
            id
            ingredient {
                id
                name
            }
        }
    }
`;
