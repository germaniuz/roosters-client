import { gql } from 'graphql-tag';
import { FORTUNE_WHEEL_SLOT_FRAGMENT } from '~/gql/fragments/fortune';

export const SPIN_FORTUNE_WHEEL = gql`
    mutation spinClientFortuneWheelSpin($order_id: Int!) {
        spinClientFortuneWheelSpin(order_id: $order_id) {
            ...FortuneWheelSlot
        }
    }
    ${FORTUNE_WHEEL_SLOT_FRAGMENT}
`;
