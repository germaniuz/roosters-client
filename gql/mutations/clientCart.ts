import { gql } from 'graphql-tag';

export const CREATE_CLIENT_CART = gql`
    mutation createClientCart(
        $preset: AppGraphQLv1ClientTypesPresetFieldInput
        $product_category_option: AppGraphQLv1ClientTypesProductCategoryOptionFieldInput
        $cart_category_option_ingredients: [AppGraphQLv1ClientTypesCartCategoryOptionIngredientFieldInput]
    ) {
        createClientCart(
            preset: $preset
            product_category_option: $product_category_option
            cart_category_option_ingredients: $cart_category_option_ingredients
        ) {
            items {
                id
                quantity
                product {
                    price
                    product {
                        name
                    }
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
            }
        }
    }
`;

export const CHANGE_CART_PRODUCT_QUANTITY = gql`
    mutation changeClientCartItemQuantity($cart_item_id: Int!, $quantity: Int!) {
        changeClientCartItemQuantity(cart_item_id: $cart_item_id, quantity: $quantity) {
            items {
                id
                quantity
                preset {
                    id
                    name
                    description
                }
                product {
                    id
                    price
                    product {
                        name
                        file {
                            url
                        }
                    }
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
            }
        }
    }
`;

export const DELETE_CLIENT_CART = gql`
    mutation deleteClientCart($cart_item_id: Int!) {
        deleteClientCart(cart_item_id: $cart_item_id)
    }
`;

export const DROP_CLIENT_CART = gql`
    mutation dropCart {
        dropClientCart
    }
`;
