import type { Product } from '~/types/Product';

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
