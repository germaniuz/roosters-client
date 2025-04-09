import { gql } from 'graphql-tag';
import { SHOP_FULL_FRAGMENT } from '~/gql/fragments/shop';
export const SHOP_LIST = gql`
    query clientShopList(
        $ids: [Int]
        $search: String
        $limit: Int
        $offset: Int #  TODO       $orders: [adminOptionListOrder]
        $case_insensitive_search: Boolean
    ) {
        clientShopList(
            ids: $ids
            search: $search
            limit: $limit
            offset: $offset # orders: $orders
            case_insensitive_search: $case_insensitive_search
        ) {
            items {
                ...ShopFull
            }
            count
        }
    }
    ${SHOP_FULL_FRAGMENT}
`;

export const IS_PICKUP_SHOP_OPEN = gql`
    query isPickupShopOpen($shop_id: Float!) {
        isPickupShopOpen(shop_id: $shop_id)
    }
`;

export const CURRENT_GEOZONE_SHOP = gql`
    query currentGeozoneDeliveryShop($latitude: Float!, $longitude: Float!) {
        currentGeozoneDeliveryShop(latitude: $latitude, longitude: $longitude) {
            ...ShopFull
        }
    }
    ${SHOP_FULL_FRAGMENT}
`;
