import { gql } from 'graphql-tag';

export const CASHBACK_TRANSACTION_FRAGMENT = gql`
    fragment CashbackTransaction on CommonCashbackTransaction {
        id
        initial_amount
        cashback_percent
        comment
        created_at
        updated_at
    }
`;
