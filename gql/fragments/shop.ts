import { ADDRESS_FRAGMENT } from '~/gql/fragments/address';
import { gql } from 'graphql-tag';

export const SHOP_FULL_FRAGMENT = gql`
    fragment ShopFull on CommonShop {
        id
        name
        color
        delivery_schedule {
            id
            day
            day_text
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
            day_text
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
    ${ADDRESS_FRAGMENT}
`;
