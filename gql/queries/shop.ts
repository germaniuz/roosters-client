import { gql } from 'graphql-tag';
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
                    city
                    street
                    house
                    location {
                        longitude
                        latitude
                    }
                }
            }
            count
        }
    }
`;
