import { gql } from 'graphql-tag';
import { FORTUNE_WHEEL_SLOT_FRAGMENT, FORTUNE_WHEEL_SPIN_FRAGMENT } from '~/gql/fragments/fortune';

export const CLIENT_FORTUNE_WHEEL_QUERY = gql`
    query clientFortuneWheel {
        clientFortuneWheel {
            ...FortuneWheelSlot
        }
    }
    ${FORTUNE_WHEEL_SLOT_FRAGMENT}
`;

export const CLIENT_FORTUNE_WHEEL_SPINS_QUERY = gql`
    query clientFortuneWheelSpins {
        clientFortuneWheelSpins {
            ...FortuneWheelSpin
        }
    }
    ${FORTUNE_WHEEL_SPIN_FRAGMENT}
`;
