import type { CommonFile } from '~/types/Form';

export type Product = {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
    description: string;
    nutritional_value_proteins: string;
    nutritional_value_fats: string;
    nutritional_value_carbs: string;
    energy_value: string;
    file: CommonFile;
    product_category_options: ProductCategoryOption[];
    product_ingredients: ProductIngredient[];
    badges: Badge[];
    category_option_ingredient_excludes: CategoryOptionIngredient[];
    product_unique_ingredients: ProductUniqueIngredient[];
    category: Category;
};

export type Option = {
    id: number;
    name: string;
    description: string;
    is_active: boolean;
    file: CommonFile;
};

export type Category = {
    id: number;
    name: string;
    slug: string;
    description: string;
    is_active: boolean;
    category_options: CategoryOption[];
    category_options_ingredient: CategoryOptionIngredient[];
    file: CommonFile;
    created_at: string;
    updated_at: string;
};

export type CategoryOption = {
    id: number;
    created_at: string;
    updated_at: string;
    option: Option;
    category: Category;
    order: number;
};

export type CategoryOptionIngredient = {
    id: number;
    price: number;
    created_at: string;
    updated_at: string;
    ingredient: Ingredient;
    category_options: CategoryOption;
    order: number;
};

export type ProductCategoryOption = {
    id: number;
    created_at: string;
    updated_at: string;
    product_id: string;
    product: Product;
    category_option_id: string;
    category_option: CategoryOption;
    weight: number;
    price: number;
};

export type Ingredient = {
    id: number;
    name: string;
    description: string;
    file: CommonFile;
};

export type ProductIngredient = {
    id: number;
    created_at: string;
    updated_at: string;
    product_id: number;
    product: Product;
    ingredient_id: number;
    ingredient: Ingredient;
    order: number;
};

export type ProductUniqueIngredient = {
    id: number;
    created_at: string;
    updated_at: string;
    product_id: number;
    product: Product;
    ingredient_id: number;
    ingredient: Ingredient;
    price: number;
    order: number;
};

export type Badge = {
    id: number;
    name: string;
    description: string;
    file: CommonFile;
};
