import { gql } from 'graphql-tag';
import { FILE_FRAGMENT } from '~/gql/fragments/file';

export const INGREDIENT_FRAGMENT = gql`
    fragment Ingredient on CommonIngredient {
        id
        name
        description
        file {
            ...File
        }
    }
    ${FILE_FRAGMENT}
`;

export const OPTION_FRAGMENT = gql`
    fragment Option on CommonOption {
        id
        name
        description
        is_active
        file {
            ...File
        }
    }
    ${FILE_FRAGMENT}
`;

export const CATEGORY_OPTION_SHORT_FRAGMENT = gql`
    fragment CategoryOptionShort on CommonCategoryOption {
        id
        option {
            ...Option
        }
        order
    }
    ${FILE_FRAGMENT}
    ${OPTION_FRAGMENT}
`;

export const CATEGORY_OPTION_INGREDIENT_FRAGMENT = gql`
    fragment CategoryOptionIngredient on CommonCategoryOptionIngredient {
        id
        category_options {
            ...CategoryOptionShort
        }
        ingredient {
            ...Ingredient
        }
        price
        order
    }
    ${INGREDIENT_FRAGMENT}
`;

export const CATEGORY_SHORT_FRAGMENT = gql`
    fragment CategoryShort on CommonCategory {
        id
        name
        description
        category_options_ingredient {
            ...CategoryOptionIngredient
        }
        file {
            ...File
        }
    }
    ${FILE_FRAGMENT}
    ${CATEGORY_OPTION_INGREDIENT_FRAGMENT}
`;

export const CATEGORY_OPTION_FULL_FRAGMENT = gql`
    fragment CategoryOptionFull on CommonCategoryOption {
        id
        option {
            ...Option
        }
        category {
            ...CategoryShort
        }
        order
    }
    ${CATEGORY_SHORT_FRAGMENT}
    ${OPTION_FRAGMENT}
`;

export const CATEGORY_FULL_FRAGMENT = gql`
    fragment CategoryFull on CommonCategory {
        id
        name
        description
        category_options {
            ...CategoryOptionShort
        }
        category_options_ingredient {
            ...CategoryOptionIngredient
        }
        file {
            ...File
        }
    }
    ${FILE_FRAGMENT}
    ${CATEGORY_OPTION_SHORT_FRAGMENT}
    ${CATEGORY_OPTION_INGREDIENT_FRAGMENT}
`;

export const BADGE_FRAGMENT = gql`
    fragment Badge on CommonBadge {
        id
        name
        description
        file {
            ...File
        }
    }
    ${FILE_FRAGMENT}
`;
