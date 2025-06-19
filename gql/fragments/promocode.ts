import { gql } from 'graphql-tag';

export const PROMOCODE_FRAGMENT = gql`
    fragment Promocode on CommonPromocode {
        code
    }
`;
