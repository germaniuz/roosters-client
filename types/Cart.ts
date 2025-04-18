import type { CategoryOptionIngredient, ProductCategoryOption } from '~/types/Product';
import * as v from 'valibot';

export const CartCategoryOptionIngredientInputSchema = v.object({
    category_option_ingredient_id: v.nonNullable(v.number(), 'Укажите category_option_ingredient_id'),
    quantity: v.nonNullable(v.number(), 'Укажите quantity'),
});
export type CartCategoryOptionIngredientInput = v.InferOutput<typeof CartCategoryOptionIngredientInputSchema>;

export const CreateCartProductInputSchema = v.object({
    product_category_option: v.object({
        product_category_option_id: v.nonNullable(v.number(), 'Укажите category_option_ingredient_id'),
        quantity: v.nonNullable(v.number(), 'Укажите quantity'),
    }),
    cart_category_option_ingredients: v.array(CartCategoryOptionIngredientInputSchema),
});
export type CreateCartProductInput = v.InferOutput<typeof CreateCartProductInputSchema>;
export type CreateLocalCartProductInput = {
    quantity: number;
    product: ProductCategoryOption;
    cart_category_option_ingredients: CartCategoryOptionIngredient[];
};

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
