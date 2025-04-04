import { gql } from 'graphql-tag';
import { ADDRESS_FRAGMENT } from '~/gql/fragments/address';
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
                id
                name
                color
                delivery_schedule {
                    id
                    day
                    day_slug
                    time_start
                    time_end
                    geozone {
                        id
                        name
                        polygon
                        isActive
                        delivery_time
                        color
                        day_delivery_cost
                        night_delivery_cost
                    }
                }
                pickup_schedule {
                    id
                    day
                    day_slug
                    time_end
                    time_start
                }
                product_stoplist {
                    id
                    product {
                        id
                        name
                    }
                }
                address {
                    ...Address
                }
            }
            count
        }
    }
    ${ADDRESS_FRAGMENT}
`;

export const IS_PICKUP_SHOP_OPEN = gql`
    query isPickupShopOpen($shop_id: Float!) {
        isPickupShopOpen(shop_id: $shop_id)
    }
`;
