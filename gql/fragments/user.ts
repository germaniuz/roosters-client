import { SHOP_FULL_FRAGMENT } from '~/gql/fragments/shop';
import { gql } from 'graphql-tag';

export const USER_FRAGMENT = gql`
    fragment User on CommonUser {
        id
        name
        email
        created_at
        updated_at
        cashback
        shop {
            ...ShopFull
        }
    }
    ${SHOP_FULL_FRAGMENT}
`;
