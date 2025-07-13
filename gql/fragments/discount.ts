import { gql } from 'graphql-tag';

export const APPLIED_DISCOUNT_FRAGMENT = gql`
    fragment AppliedDiscount on ClientAppliedDiscount {
        id
        name
        description
        discount_type
        discount_value
        promocode_code
        promocode_id
        applied_at
    }
`;

export const AVAILABLE_DISCOUNT_FRAGMENT = gql`
    fragment AvailableDiscount on ClientAvailableDiscount {
        id
        name
        description
        discount_type
        discount_value
        estimated_amount
        can_apply
        reason
    }
`;

export const CART_TOTALS_FRAGMENT = gql`
    fragment CartTotals on ClientCartTotals {
        discount_amount
        final_amount
        items_count
        original_amount
        savings_percentage
    }
`;
