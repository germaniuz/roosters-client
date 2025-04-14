import { gql } from 'graphql-tag';

export const FILE_FRAGMENT = gql`
    fragment File on CommonFile {
        id
        name
        size
        url
    }
`;
