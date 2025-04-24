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

export const USER_ADDRESS_FRAGMENT = gql`
    fragment UserAddress on CommonUserAddress {
        id
        is_active
        apartment
        comment
        entrance
        floor
        is_current
        intercom_code
        address {
            ...Address
        }
    }
    ${ADDRESS_FRAGMENT}
`;
