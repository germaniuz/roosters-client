import type { Product } from '~/types/Product';
import * as v from 'valibot';

export const CartCategoryOptionIngredientInputSchema = v.object({
    category_option_ingredient_id: v.nonNullable(v.number(), 'Укажите category_option_ingredient_id'),
    quantity: v.nonNullable(v.number(), 'Укажите quantity'),
});

export type CartCategoryOptionIngredientInput = v.InferOutput<typeof CartCategoryOptionIngredientInputSchema>;

export type CartProduct = {
    quantity: number;
    preset?: string;
    product: {
        id: number;
        product_id: number;
        price: number;
        product: Product;
    };
};

export type DeliveryTimeOption = {
    id: number;
    title: string;
};
