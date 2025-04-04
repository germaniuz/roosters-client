import { gql } from 'graphql-tag';
import { ADDRESS_FRAGMENT } from '~/gql/fragments/address';

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
            is_active
            addresses {
                id
                address {
                    ...Address
                }
                apartment
                entrance
                floor
                intercom_code
                comment
                is_current
                is_active
            }
        }
    }
    ${ADDRESS_FRAGMENT}
`;
