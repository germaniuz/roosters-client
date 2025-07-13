import { gql } from 'graphql-tag';
import { APPLIED_DISCOUNT_FRAGMENT, CART_TOTALS_FRAGMENT } from '~/gql/fragments/discount';

export const APPLY_PROMOCODE = gql`
    mutation applyClientCartPromocodeDiscount($code: String!) {
        applyClientCartPromocodeDiscount(code: $code) {
            discount {
                ...AppliedDiscount
            }
            error_message
            new_cart_total
            promocode_id
            success
            totals {
                ...CartTotals
            }
        }
    }
    ${APPLIED_DISCOUNT_FRAGMENT}
    ${CART_TOTALS_FRAGMENT}
`;

export const REMOVE_PROMOCODE = gql`
    mutation removeClientCartPromocodeDiscount($promocode_id: Int!) {
        removeClientCartPromocodeDiscount(promocode_id: $promocode_id) {
            discount {
                ...AppliedDiscount
            }
            error_message
            new_cart_total
            promocode_id
            success
            totals {
                ...CartTotals
            }
        }
    }
    ${APPLIED_DISCOUNT_FRAGMENT}
    ${CART_TOTALS_FRAGMENT}
`;
