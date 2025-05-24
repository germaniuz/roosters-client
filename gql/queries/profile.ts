import { gql } from 'graphql-tag';
import { USER_ADDRESS_FRAGMENT } from '~/gql/fragments/address';

export const CLIENT_PROFILE = gql`
    query clientProfile {
        clientProfile {
            id
            name
            lastname
            email
            phone
            birthday
            gender
            cashback
            addresses {
                ...UserAddress
            }
            is_active
        }
    }
    ${USER_ADDRESS_FRAGMENT}
`;
