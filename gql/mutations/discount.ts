import { gql } from 'graphql-tag';
import { DISCOUNT_APPLICATION_RESULT_FRAGMENT } from '~/gql/fragments/discount';

export const APPLY_PROMOCODE = gql`
    mutation applyClientCartPromocodeDiscount($code: String!) {
        applyClientCartPromocodeDiscount(code: $code) {
            ...DiscountApplicationResult
        }
    }
    ${DISCOUNT_APPLICATION_RESULT_FRAGMENT}
`;

export const REMOVE_PROMOCODE = gql`
    mutation removeClientCartPromocodeDiscount($promocode_id: Int!) {
        removeClientCartPromocodeDiscount(promocode_id: $promocode_id) {
            ...DiscountApplicationResult
        }
    }
    ${DISCOUNT_APPLICATION_RESULT_FRAGMENT}
`;
