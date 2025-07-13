import type { CategoryOptionIngredient, ProductCategoryOption, ProductIngredient } from '~/types/Product';
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
    exclude_product_ingredient_ids: v.array(v.number()),
    cart_product_unique_ingredients: v.array(v.number()),
});
export const UpdateCartProductInputSchema = v.object({
    cart_item_id: v.nonNullable(v.number(), 'Укажите cart_item_id'),
    ...CreateCartProductInputSchema.entries,
});
export const ChangeProductQuantityInputSchema = v.object({
    cart_item_id: v.nonNullable(v.number(), 'Укажите cart_item_id'),
    quantity: v.nonNullable(v.number(), 'Укажите quantity'),
});

export type CreateCartProductInput = v.InferOutput<typeof CreateCartProductInputSchema>;
export type UpdateCartProductInput = v.InferOutput<typeof UpdateCartProductInputSchema>;
export type ChangeProductQuantityInput = v.InferOutput<typeof ChangeProductQuantityInputSchema>;

export type CreateLocalCartProductInput = {
    quantity: number;
    product: ProductCategoryOption;
    cart_category_option_ingredients: CartCategoryOptionIngredient[];
    exclude_product_ingredients: ProductIngredient[];
    cart_product_unique_ingredients: CartCategoryOptionIngredient[];
};
export type UpdateLocalCartProductInput = {
    id: number;
    quantity: number;
    product: ProductCategoryOption;
    cart_category_option_ingredients: CartCategoryOptionIngredient[];
    exclude_product_ingredients: ProductIngredient[];
    cart_product_unique_ingredients: CartCategoryOptionIngredient[];
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
    exclude_product_ingredients: ProductIngredient[];
    cart_product_unique_ingredients: CartCategoryOptionIngredient[];
};
