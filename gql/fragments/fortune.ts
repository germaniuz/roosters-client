import { gql } from 'graphql-tag';
import { ORDER_FRAGMENT } from '~/gql/fragments/order';
import { PROMOCODE_FRAGMENT } from '~/gql/fragments/promocode';
import { CASHBACK_TRANSACTION_FRAGMENT } from '~/gql/fragments/cashback';

export const FORTUNE_WHEEL_SLOT_FRAGMENT = gql`
    fragment FortuneWheelSlot on CommonFortuneWheelSlot {
        id
        title
        cashback_value
        promocode_id
        promocode {
            ...Promocode
        }
    }
    ${PROMOCODE_FRAGMENT}
`;

export const FORTUNE_WHEEL_SPIN_FRAGMENT = gql`
    fragment FortuneWheelSpin on CommonFortuneWheelSpin {
        id
        cashback_transaction {
            ...CashbackTransaction
        }
        order {
            ...Order
        }
        promocode {
            ...Promocode
        }
    }
    ${CASHBACK_TRANSACTION_FRAGMENT}
    ${ORDER_FRAGMENT}
    ${PROMOCODE_FRAGMENT}
`;
