import type { Promocode } from '~/types/Promocode';
import type { CashbackTransaction } from '~/types/Cashback';
import type { Order } from '~/types/Order';

export type FortuneWheelSlot = {
    id: number;
    title: string;
    cashback_value: number;
    promocode_id: number;
    promocode: Promocode;
};

export type FortuneWheelSpin = {
    id: number;
    cashback_transaction: CashbackTransaction;
    order: Order;
    promocode: Promocode;
};

export type FortuneWheelSlotList = {
    count: number;
    items: FortuneWheelSlot[];
};
