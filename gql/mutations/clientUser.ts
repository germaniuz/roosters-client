import { gql } from 'graphql-tag';

export const UPDATE_CLIENT_USER = gql`
    mutation updateClientUser(
        $name: String
        $lastname: String
        $email: String
        $gender: ClientEnumsGenderEnum!
        $birthday: String
        $avatar: Upload
    ) {
        updateClientUser(
            email: $email
            name: $name
            lastname: $lastname
            gender: $gender
            birthday: $birthday
            avatar: $avatar
        ) {
            id
            name
            lastname
            email
            phone
            birthday
            gender
            is_active
            avatar {
                id
                created_at
                updated_at
                name
                ext
                url
                size
            }
            fullname
        }
    }
`;
