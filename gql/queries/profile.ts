import { gql } from 'graphql-tag';

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
        }
    }
`;
