import { gql } from 'graphql-tag';
import { PRODUCT_FULL_FRAGMENT } from '~/gql/fragments/product';

export const PRODUCT_FULL_LIST = gql`
    query clientProductList($ids: [Int], $search: String, $limit: Int, $offset: Int) {
        clientProductList(ids: $ids, search: $search, limit: $limit, offset: $offset) {
            items {
                ...ProductFull
            }
            count
        }
    }
    ${PRODUCT_FULL_FRAGMENT}
`;
