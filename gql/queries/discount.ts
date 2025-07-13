import { gql } from 'graphql-tag';
import { AVAILABLE_DISCOUNT_FRAGMENT } from '~/gql/fragments/discount';

export const AVAILABLE_DISCOUNTS_QUERY = gql`
    query clientAvailableCartDiscounts($promocode: String) {
        clientAvailableCartDiscounts(promocode: $promocode) {
            ...AvailableDiscount
        }
    }
    ${AVAILABLE_DISCOUNT_FRAGMENT}
`;
