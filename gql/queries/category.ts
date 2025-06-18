import { gql } from 'graphql-tag';
import { CATEGORY_FULL_FRAGMENT } from '~/gql/fragments/category';

export const CATEGORY_LIST_QUERY = gql`
    query clientCategoryList(
        $ids: [Int]
        $search: String
        $limit: Int
        $offset: Int
        $case_insensitive_search: Boolean
    ) {
        clientCategoryList(
            ids: $ids
            search: $search
            limit: $limit
            offset: $offset
            case_insensitive_search: $case_insensitive_search
        ) {
            items {
                ...CategoryFull
            }
            count
        }
    }
    ${CATEGORY_FULL_FRAGMENT}
`;