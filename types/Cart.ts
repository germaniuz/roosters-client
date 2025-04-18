import type { CategoryOptionIngredient, ProductCategoryOption } from '~/types/Product';
import * as v from 'valibot';

export const CartCategoryOptionIngredientInputSchema = v.object({
    category_option_ingredient_id: v.nonNullable(v.number(), 'Укажите category_option_ingredient_id'),
    quantity: v.nonNullable(v.number(), 'Укажите quantity'),
});

export type CartCategoryOptionIngredientInput = v.InferOutput<typeof CartCategoryOptionIngredientInputSchema>;

export type CartCategoryOptionIngredient = {
    category_option_ingredient: CategoryOptionIngredient;
    quantity: number;
};

export type CartProduct = {
    id: number;
    quantity: number;
    preset?: string;
    product: ProductCategoryOption;
    cart_category_option_ingredients: CartCategoryOptionIngredient[];
};

export type DeliveryTimeOption = {
    id: number;
    title: string;
};
