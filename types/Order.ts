import * as v from 'valibot';
import type { Shop } from '~/types/Shop';
import { type UserAddress, UserAddressFieldsSchema } from '~/types/Profile';
import type { CategoryOptionIngredient, ProductCategoryOption, ProductIngredient } from '~/types/Product';
import type { Preset } from 'unenv';
import type { InferOutput } from 'valibot';
import type { Values } from '~/utils/data';
import { DELIVERY_TYPE, PAYMENT_TYPE, type ORDER_STATUS } from '~/constants/order';

export const OrderInputSchema = v.object({
    shop_id: v.number(),
    customer_comment: v.string(),
    payment_type: v.picklist(Object.values(PAYMENT_TYPE), 'Укажите валидный тип оплаты'),
    delivery_type: v.picklist(Object.values(DELIVERY_TYPE), 'Укажите валидный тип доставки'),
    user_address: UserAddressFieldsSchema,
});

export type OrderInput = InferOutput<typeof OrderInputSchema>;

export type Order = {
    id: number;
    shop: Shop;
    status_text: string;
    status: Values<typeof ORDER_STATUS>;
    amount: number;
    payment_type: Values<typeof PAYMENT_TYPE>;
    payment_type_text: string;
    delivery_type: Values<typeof DELIVERY_TYPE>;
    delivery_type_text: string;
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
