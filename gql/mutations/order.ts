import { ORDER_FRAGMENT } from '~/gql/fragments/order';
import { gql } from 'graphql-tag';

export const CREATE_ORDER = gql`
    mutation createClientOrder(
        $shop_id: Int!
        $customer_comment: String
        $payment_type: Int!
        $user_address: AppGraphQLv1CommonTypesUserAddressInput
    ) {
        createClientOrder(
            shop_id: $shop_id
            customer_comment: $customer_comment
            payment_type: $payment_type
            user_address: $user_address
        ) {
            ...Order
        }
    }
    ${ORDER_FRAGMENT}
`;

export const CREATE_PAYMENT_URL = gql`
    mutation createPaymentUrl($order_id: Int!) {
        createClientOrderPaymentUrl(order_id: $order_id) {
            url
        }
    }
`;
