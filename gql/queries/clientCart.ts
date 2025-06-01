import { gql } from 'graphql-tag';
import { CART_ITEM_FRAGMENT } from '~/gql/fragments/cart';

export const CLIENT_CART = gql`
    query clientCart {
        clientCart {
            items {
                ...CartItem
            }
        }
    }
    ${CART_ITEM_FRAGMENT}
`;
