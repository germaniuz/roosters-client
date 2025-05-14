import * as v from 'valibot';
import type { Shop } from '~/types/Shop';
import { type UserAddress, UserAddressFieldsSchema } from '~/types/Profile';
import type { CategoryOptionIngredient, ProductCategoryOption, ProductIngredient } from '~/types/Product';
import type { Preset } from 'unenv';
import { PAYMENT_TYPE } from '~/constants/order';
import type { InferOutput } from 'valibot';

export const OrderInputSchema = v.object({
    shop_id: v.number(),
    customer_comment: v.string(),
    payment_type: v.picklist(Object.values(PAYMENT_TYPE), 'Укажите валидный тип оплаты'),
    user_address: UserAddressFieldsSchema,
});

export type OrderInput = InferOutput<typeof OrderInputSchema>;

export type Order = {
    id: number;
    shop: Shop;
    status_text: string;
    amount: number;
    payment_type_text: string;
    customer_comment: string;
    user_address: UserAddress;
    payment_date: string;
    order_products: OrderProduct[];
    order_ingredients: OrderIngredient[];
    created_at: string;
    updated_at: string;
};

export type OrderProduct = {
    id: number;
    preset: Preset;
    product_category_option: ProductCategoryOption;
    quantity: number;
    price: number;
    exclude_product_ingredients: ProductIngredient[];
};

export type OrderIngredient = {
    id: number;
    category_option_ingredients: CategoryOptionIngredient[];
    quantity: number;
    price: number;
};
