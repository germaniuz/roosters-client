import * as v from 'valibot';

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

export type DiscountApplicationResult = {
    discount: AppliedDiscount | null;
    error_message: string | null;
    new_cart_total: number | null;
    promocode_id: number | null;
    success: boolean | null;
    totals: CartTotals | null;
};

export const ApplyPromocodeFieldsSchema = v.object({
    code: v.pipe(v.string(), v.nonEmpty('Введите промокод')),
});

export type ApplyPromocodeFields = v.InferOutput<typeof ApplyPromocodeFieldsSchema>;

export const RemovePromocodeFieldsSchema = v.object({
    promocode_id: v.number(),
});

export type RemovePromocodeFields = v.InferOutput<typeof RemovePromocodeFieldsSchema>;
