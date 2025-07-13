export type AppliedDiscount = {
    id: number;
    name: string;
    description: string | null;
    discount_type: string;
    discount_value: number;
    promocode_code: string | null;
    promocode_id: number | null;
    applied_at: string;
};

export type AvailableDiscount = {
    id: number;
    name: string;
    description: string | null;
    discount_type: string;
    discount_value: number;
    estimated_amount: number | null;
    can_apply: boolean;
    reason: string | null;
};

export type CartTotals = {
    discount_amount: number;
    final_amount: number;
    items_count: number;
    original_amount: number;
    savings_percentage: number;
};
