import { SHOP_FULL_FRAGMENT } from '~/gql/fragments/shop';
import { gql } from 'graphql-tag';
import { USER_FRAGMENT } from '~/gql/fragments/user';
import { USER_ADDRESS_FRAGMENT } from '~/gql/fragments/address';

export const ORDER_PRODUCT_SHORT_FRAGMENT = gql`
    fragment OrderProductShort on CommonOrderProduct {
        id
        preset {
            id
            name
        }
        product_category_option {
            id
            price
            product {
                name
                file {
                    url
                }
            }
        }
        quantity
        price
        order {
            id
        }
    }
`;

export const ORDER_INGREDIENT_FRAGMENT = gql`
    fragment OrderIngredient on CommonOrderIngredient {
        id
        quantity
        price
        category_option_ingredient {
            id
            ingredient {
                name
            }
            category_options {
                category {
                    id
                    name
                }
                option {
                    id
                    name
                }
            }
        }
        order {
            id
        }
    }
`;

export const ORDER_FRAGMENT = gql`
    fragment Order on CommonOrder {
        id
        user {
            ...User
        }
        shop {
            ...ShopFull
        }
        status
        status_text
        amount
        payment_type
        payment_type_text
        cooking_start_time
        customer_comment
        user_address {
            ...UserAddress
        }
        payment_date
        order_products {
            ...OrderProductShort
        }
        order_ingredients {
            ...OrderIngredient
        }
        created_at
        updated_at
    }
    ${USER_FRAGMENT}
    ${SHOP_FULL_FRAGMENT}
    ${USER_ADDRESS_FRAGMENT}
    ${ORDER_PRODUCT_SHORT_FRAGMENT}
    ${ORDER_INGREDIENT_FRAGMENT}
`;
