import type { Ingredient, Product } from '~/types/Product';
import type { Geozone } from '~/types/Geozone';

export type Shop = {
    id: number;
    color: string;
    name: string;
    pickup_schedule: PickupSchedule[];
    delivery_schedule: DeliverySchedule[];
    ingredient_stoplist: {
        id: number;
        ingredient: Ingredient;
        shop: Shop;
    };
    product_stoplist: {
        id: number;
        product: Product;
        shop: Shop;
    }[];
    address: {
        city: string;
        street: string;
        house: string;
        location: {
            longitude: number;
            latitude: number;
        };
    };
};

export type PickupSchedule = {
    id: number;
    day: string;
    day_slug: Day;
    shop: Shop;
    time_start: string;
    time_end: string;
};

export type DeliverySchedule = {
    id: number;
    day: string;
    day_slug: Day;
    geozone: Geozone;
    shop: Shop;
    time_start: string;
    time_end: string;
};

export type Day = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
