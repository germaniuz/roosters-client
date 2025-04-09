import { gql } from 'graphql-tag';

export const ADDRESS_FRAGMENT = gql`
    fragment Address on CommonAddress {
        id
        city
        fias_id
        street
        street_type
        house
        location {
            latitude
            longitude
        }
    }
`;
