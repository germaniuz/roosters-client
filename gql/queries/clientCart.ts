import { gql } from 'graphql-tag';
import { CART_ITEM_FRAGMENT } from '~/gql/fragments/cart';
import { APPLIED_DISCOUNT_FRAGMENT, AVAILABLE_DISCOUNT_FRAGMENT, CART_TOTALS_FRAGMENT } from '~/gql/fragments/discount';

export const CLIENT_CART = gql`
    query clientCart {
        clientCart {
            items {
                ...CartItem
            }
            applied_discounts {
                ...AppliedDiscount
            }
            available_automatic_discounts {
                ...AvailableDiscount
            }
            totals {
                ...CartTotals
            }
            count
        }
    }
    ${CART_ITEM_FRAGMENT}
    ${APPLIED_DISCOUNT_FRAGMENT}
    ${AVAILABLE_DISCOUNT_FRAGMENT}
    ${CART_TOTALS_FRAGMENT}
`;
