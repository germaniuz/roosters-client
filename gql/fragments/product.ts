import { gql } from 'graphql-tag';
import { BADGE_FRAGMENT, CATEGORY_OPTION_SHORT_FRAGMENT, CATEGORY_SHORT_FRAGMENT } from '~/gql/fragments/category';
import { FILE_FRAGMENT } from '~/gql/fragments/file';

export const PRODUCT_CATEGORY_OPTION_SHORT_FRAGMENT = gql`
    fragment ProductCategoryOptionShort on CommonProductCategoryOption {
        id
        price
        weight
        category_option_id
        category_option {
            ...CategoryOptionShort
        }
    }
    ${CATEGORY_OPTION_SHORT_FRAGMENT}
`;

export const PRODUCT_SHORT_FRAGMENT = gql`
    fragment ProductShort on CommonProduct {
        id
        name
        file {
            url
            name
            size
        }
        category {
            ...CategoryShort
        }
        product_category_options {
            ...ProductCategoryOptionShort
        }
    }
    ${PRODUCT_CATEGORY_OPTION_SHORT_FRAGMENT}
`;

export const PRODUCT_INGREDIENT_FRAGMENT = gql`
    fragment ProductIngredient on CommonProductIngredient {
        id
        ingredient_id
        ingredient {
            ...Ingredient
        }
        order
    }
`;

export const PRODUCT_FULL_FRAGMENT = gql`
    fragment ProductFull on CommonProduct {
        id
        name
        category {
            ...CategoryShort
        }
        product_category_options {
            ...ProductCategoryOptionShort
        }
        product_ingredients {
            ...ProductIngredient
        }
        description
        energy_value
        nutritional_value_carbs
        nutritional_value_fats
        nutritional_value_proteins
        badges {
            ...Badge
        }
        file {
            ...File
        }
        is_active
    }
    ${PRODUCT_CATEGORY_OPTION_SHORT_FRAGMENT}
    ${FILE_FRAGMENT}
    ${BADGE_FRAGMENT}
    ${CATEGORY_SHORT_FRAGMENT}
    ${PRODUCT_INGREDIENT_FRAGMENT}
`;
