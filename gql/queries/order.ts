import { gql } from 'graphql-tag';
import { ORDER_FRAGMENT } from '../fragments/order';

export const ORDER_LIST = gql`
    query orderList($ids: [Int]) {
        clientOrderList(ids: $ids) {
            items {
                ...Order
            }
            count
        }
    }
    ${ORDER_FRAGMENT}
`;
