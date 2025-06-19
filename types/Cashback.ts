import type { Order } from '~/types/Order';

export type CashbackTransaction = {
    id: number;
    initial_amount: number;
    cashback_percent: number;
    comment: string;
    created_at: string;
    updated_at: string;
    entity_cashback_transaction?: CashbackTransaction;
    entity_order?: Order;
};
